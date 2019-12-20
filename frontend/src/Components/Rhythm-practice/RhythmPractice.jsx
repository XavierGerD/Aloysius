import React, { Component } from "react";
import {
  checkFirst,
  checkLast,
  checkMid,
  renderBeamless
} from "./beamchecker.js";
import { fillInTuplets } from "./tupletBracketChecker.js";
import "./RhythmPractice.css";
import getTimeSig from "./render.js";
import {
  barlines,
  singleStaff,
  timeSignatureCodes
} from "../UnicodeAssignment.js";
import { Howl, Howler } from "howler";

let blip01 = new Howl({ src: ["/Assets/Sons/metronome_low.wav"] });
let blip02 = new Howl({ src: ["/Assets/Sons/metronome_high.wav"] });
let clap = new Howl({ src: ["/Assets/Sons/hand_clap.wav"] });
let countdownSound = new Howl({ src: ["/Assets/Sons/countdown.wav"] });

class RhythmPractice extends Component {
  state = {
    tempoInput: "60",
    repInput: "4",
    size: [],
    timeSignatures: [0, 0],
    binaryFigures: [],
    displayedTimeSignatures: [undefined, undefined],
    displayedFigures: [],
    displayedTuplets: [],
    started: false,
    countDownCheck: false,
    allowEmptyBars: false,
    playAnswer: false,
    phase: "countdown",
    lastBeat: new Date() / 1,
    repCount: 1,
    subdivisionCount: 1,
    mode: "bar",
    playEveryEighth: false
  };

  countDownFrame;
  playAndCountFrame;

  tempoInputHandler = e => {
    this.setState({ tempoInput: e.target.value });
  };

  repInputHandler = e => {
    this.setState({ repInput: e.target.value });
  };

  modeChangeHandler = ev => {
    let mode = ev.target.value;
    this.setState({ mode });
  };

  checkBoxChecker = (e, i) => {
    let size = [...this.state.size];
    if (e.target.checked) {
      size.push(i);
    } else {
      let b = size.indexOf(i);
      size.splice(b, 1);
    }
    this.setState({ size });
  };

  clickFrequencyChecker = e => {
    this.setState({ playEveryEighth: !this.state.playEveryEighth });
  };

  allowEmptyBarChecker = e => {
    this.setState({ allowEmptyBars: !this.state.allowEmptyBars });
  };

  playAnswerChecker = e => {
    this.setState({ playAnswer: !this.state.playAnswer });
  };

  getRandomTimeSig = size => {
    let randomSig = size[Math.floor(Math.random() * size.length)];
    return randomSig;
  };

  //Generates random int between 0 and 1
  getRandomInt = (min, max) => {
    min = Math.ceil(0);
    max = Math.floor(2);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  //Adds values to an array
  getRandomArray = max => {
    let temp = [];
    for (let i = 0; i < max; i++) {
      temp.push(this.getRandomInt());
    }
    if (!this.state.allowEmptyBars) {
      // if the bar is empty, return a new bar
      let empty = false;
      temp.forEach(value => {
        if (value === 1) {
          empty = true;
        }
      });
      if (!empty) {
        temp = this.getRandomArray(max);
      }
    }
    return temp;
  };

  //Assembles all components
  getFigure = (size, currentFigures) => {
    // create temporary array where the rhythmic figure is stored as binary (1 = note, 0 = rest)
    let binaryFigure = this.getRandomArray(size);
    // translate the binary figure into a series of divs containing unicode characters
    let unicodeFigure = [];
    if (this.state.mode === "tuplet" && (size === 3 || size === 2)) {
      renderBeamless(binaryFigure, unicodeFigure);
      currentFigures.push(binaryFigure);
      return unicodeFigure;
    }
    checkFirst(binaryFigure, unicodeFigure);
    for (let i = 0; i < size - 2; i++) {
      checkMid(binaryFigure, unicodeFigure, i);
    }
    checkLast(binaryFigure, unicodeFigure);
    currentFigures.push(binaryFigure);
    return unicodeFigure;
  };

  loadNewImage = () => {
    // copy values from state
    let binaryFigures = [...this.state.binaryFigures];
    let displayedFigures = [...this.state.displayedFigures];
    let displayedTimeSignatures = [...this.state.displayedTimeSignatures];
    let displayedTuplets = [...this.state.displayedTuplets];
    let timeSignatures = [...this.state.timeSignatures];
    // get a random time signature from the size array,
    // remove the first figure and generate a new one, remove first time signature and generate new one
    let e = this.getRandomTimeSig(this.state.size);
    binaryFigures.shift();
    displayedFigures.shift();
    displayedFigures.push(this.getFigure(e, binaryFigures));
    timeSignatures.shift();
    timeSignatures.push(e);
    if (this.state.mode === "bar") {
      displayedTimeSignatures.shift();
      getTimeSig(e, displayedTimeSignatures, 1);
    }

    if (this.state.mode === "tuplet") {
      displayedTuplets.shift();
      displayedTuplets.push(fillInTuplets(e));
      if (e === 4) {
        displayedTuplets[1] = null;
      }
    }
    this.setState({
      binaryFigures,
      displayedFigures,
      displayedTimeSignatures,
      displayedTuplets,
      timeSignatures
    });
  };

  playAndCount = () => {
    let now = new Date() / 1;
    let clickInterval;
    let repCount = this.state.repCount;
    let subdivisionCount = this.state.subdivisionCount;
    let divider;
    let unevenBeat = false;
    if (this.state.mode === "bar") {
      // set an event every subdivision of the pulse
      divider = 2;
      unevenBeat = subdivisionCount % 2 === 1;
      // console.log("uneven beat?", unevenBeat);
    } else if (this.state.mode === "tuplet") {
      //divide whole bar by the time signature
      divider = this.state.timeSignatures[0];
    }
    // set the frequency of each potential click
    clickInterval = 60000 / parseInt(this.state.tempoInput) / divider;
    if (now - this.state.lastBeat > clickInterval) {
      if (this.state.repCount === 1 && this.state.phase === "play") {
        //load new image and ensure a new one isn't loaded right after
        this.loadNewImage();
        this.setState({ phase: "firstFigure" });
      }

      if (!this.state.playEveryEighth && unevenBeat) {
        // play only a click on uneven beats (strong beats)
        if (subdivisionCount === 1) {
          blip02.play();
        } else {
          blip01.play();
        }
      } else if (!this.state.playEveryEighth && this.state.mode === "tuplet") {
        // play only a click on the first beat of the bar
        if (subdivisionCount === 1) {
          blip02.play();
        }
      } else if (this.state.playEveryEighth) {
        // play a click on every subdivision
        if (subdivisionCount === 1) {
          blip02.play();
        } else {
          blip01.play();
        }
      }

      if (this.state.playAnswer) {
        if (this.state.binaryFigures[0][subdivisionCount - 1] === 1) {
          clap.play();
        }
      }

      subdivisionCount++;
      if (subdivisionCount > this.state.timeSignatures[0]) {
        // increase the repcount and reset subdivision counter
        repCount++;
        subdivisionCount = 1;
      }
      if (repCount > parseInt(this.state.repInput)) {
        //reset repcount and prepare to load new image at next loop
        // console.log("resetting repcount!");
        repCount = 1;
        if (this.state.phase === "firstFigure") {
          this.setState({ phase: "play" });
        }
      }
      this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
      let lastBeat = new Date() / 1;
      this.setState({ repCount, lastBeat, subdivisionCount });
      return;
    }
    this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
  };

  countDown = () => {
    //if countdown is already done, return
    if (this.state.countDownCheck) return;
    //set the current date to check if enough time has passed
    let now = new Date() / 1;
    let clickInterval = 60000 / parseInt(this.state.tempoInput);
    if (now - this.state.lastBeat > clickInterval) {
      let repCount = this.state.repCount;
      if (repCount > 4) {
        //if the 4 beat countdown is over, reset repcount and start the exercise
        repCount = 1;
        let countDownCheck = true;
        this.setState({ repCount, countDownCheck, phase: "firstFigure" });
        this.playAndCount();
        return;
      }
      countdownSound.play();

      repCount++;
      // if the coundown isn't over, set the time of the last beat and call the function again
      let lastBeat = new Date() / 1;
      this.countDownFrame = requestAnimationFrame(this.countDown);
      this.setState({ repCount, lastBeat });
      return;
    }
    this.countDownFrame = requestAnimationFrame(this.countDown);
  };

  startExercise = () => {
    if (this.state.size.length > 0 && !this.state.started) {
      // copy values from state
      let timeSignatures = [...this.state.timeSignatures];
      let binaryFigures = [...this.state.binaryFigures];
      let displayedFigures = [...this.state.displayedFigures];
      let displayedTimeSignatures = [...this.state.displayedTimeSignatures];
      let displayedTuplets = [...this.state.displayedTuplets];
      // going through both possible time signatures
      timeSignatures.forEach((timeSignature, i) => {
        //select a random value in the possible sizes (time signatures) and push both the time signature symbol and its corresponding rhythmic figure
        if (this.state.mode === "bar") {
          timeSignatures[i] = this.getRandomTimeSig(this.state.size);
          displayedFigures.push(
            this.getFigure(timeSignatures[i], binaryFigures)
          );
          getTimeSig(timeSignatures[i], displayedTimeSignatures, i);
        }
        if (this.state.mode === "tuplet") {
          timeSignatures[i] = this.getRandomTimeSig(this.state.size);
          displayedFigures.push(
            this.getFigure(timeSignatures[i], binaryFigures)
          );
          getTimeSig(2, displayedTimeSignatures, i);
          displayedTuplets.push(fillInTuplets(timeSignatures[i]));
          if (timeSignatures[i] === 4) {
            displayedTuplets[i] = null;
          }
        }
      });
      //start countdown, update state
      this.countDown();
      let started = true;
      this.setState({
        started,
        timeSignatures,
        binaryFigures,
        displayedFigures,
        displayedTimeSignatures,
        displayedTuplets
      });
    }
  };

  stopExercise = () => {
    cancelAnimationFrame(this.countDownFrame);
    cancelAnimationFrame(this.playAndCountFrame);
    this.setState({
      timeSignatures: [0, 0],
      binaryFigures: [],
      displayedFigures: [],
      displayedTuplets: [],
      started: false,
      repCount: 1,
      subdivisionCount: 1,
      countDownCheck: false,
      phase: "countdown"
    });
  };

  render = () => {
    // console.log("play answer?", this.state.playAnswer);
    return (
      <div>
        <div className="rhythmContainer">
          <div>
            <button id="start" onClick={this.startExercise}>
              Start
            </button>
            <button id="stop" onClick={this.stopExercise}>
              Stop
            </button>
          </div>
          <div className="rp-controlpanel">
            <div className="rp-panelsection">
              <div className="rp-controlitem">
                Tempo:{" "}
                <input
                  type="text"
                  onChange={this.tempoInputHandler}
                  value={this.state.tempoInput}
                  className="rp-inputBox"
                />
              </div>
              <div className="rp-controlitem">
                {" "}
                Reps:{" "}
                <input
                  type="text"
                  onChange={this.repInputHandler}
                  value={this.state.repInput}
                  className="rp-inputBox"
                />
              </div>
              <div className="rp-controlitem">Values:</div>
              <div className="rp-controlitem">
                3
                <input
                  type="checkbox"
                  onClick={event => {
                    this.checkBoxChecker(event, 3);
                  }}
                  defaultChecked={this.state.checked3}
                  className="timeSigButton"
                  id="timeSigButton3"
                />{" "}
                4
                <input
                  type="checkbox"
                  onClick={event => {
                    this.checkBoxChecker(event, 4);
                  }}
                  defaultChecked={this.state.checked4}
                  className="timeSigButton"
                  id="timeSigButton4"
                />{" "}
                5
                <input
                  type="checkbox"
                  onClick={event => {
                    this.checkBoxChecker(event, 5);
                  }}
                  defaultChecked={this.state.checked5}
                  className="timeSigButton"
                  id="timeSigButton5"
                />{" "}
                6
                <input
                  type="checkbox"
                  onClick={event => {
                    this.checkBoxChecker(event, 6);
                  }}
                  defaultChecked={this.state.checked6}
                  className="timeSigButton"
                  id="timeSigButton6"
                />{" "}
                7
                <input
                  type="checkbox"
                  onClick={event => {
                    this.checkBoxChecker(event, 7);
                  }}
                  defaultChecked={this.state.checked6}
                  className="timeSigButton"
                  id="timeSigButton6"
                />{" "}
              </div>
            </div>
            <div style={{ marginLeft: "20px" }} className="rp-panelsection">
              <div className="rp-controlitem">
                <div style={{ fontWeight: "bold", paddingRight: "5px" }}>
                  Mode:{" "}
                </div>
                <div>
                  Bar
                  <input
                    type="radio"
                    name="modeselect"
                    value="bar"
                    checked={this.state.mode === "bar"}
                    onChange={e => {
                      this.modeChangeHandler(e);
                    }}
                  />
                </div>
                <div>
                  Tuplet
                  <input
                    type="radio"
                    name="modeselect"
                    value="tuplet"
                    checked={this.state.mode === "tuplet"}
                    onChange={e => {
                      this.modeChangeHandler(e);
                    }}
                  />
                </div>
              </div>

              <div className="rp-controlitem">
                Click every subdivision:{" "}
                <input
                  type="checkbox"
                  onClick={event => {
                    this.clickFrequencyChecker(event);
                  }}
                  defaultChecked={false}
                  className="timeSigButton"
                  id="clickFrequency"
                />
              </div>

              <div className="rp-controlitem">
                Allow empty bars{" "}
                <input
                  type="checkbox"
                  onClick={event => {
                    this.allowEmptyBarChecker(event);
                  }}
                  defaultChecked={false}
                  className="timeSigButton"
                  id="clickFrequency"
                />
              </div>

              <div className="rp-controlitem">
                Play back answer{" "}
                <input
                  type="checkbox"
                  onClick={event => {
                    this.playAnswerChecker(event);
                  }}
                  defaultChecked={false}
                  className="timeSigButton"
                  id="clickFrequency"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className="practiceMain">
            {this.state.started ? (
              <div className="rp-singlestaff">{singleStaff}</div>
            ) : null}
            <div className="rp-bars">
              {this.state.displayedFigures.map((bar, i) => {
                return (
                  <div className="rp-bar">
                    {" "}
                    <div className="rp-timesig">
                      <div> {this.state.displayedTimeSignatures[i]} </div>
                      <div style={{ marginTop: "-32px" }}>
                        {this.state.mode === "bar"
                          ? timeSignatureCodes.eight
                          : timeSignatureCodes.four}
                      </div>
                    </div>
                    <div className="rp-barcontainer">
                      <div className="rp-tupletbrackets">
                        {this.state.displayedTuplets[i]}
                      </div>
                      {bar}{" "}
                    </div>
                    {i === 0 ? (
                      <div className="rp-barline">{barlines.singleBarline}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rp-instructions">
          <div style={{ fontWeight: "bold" }}>Instructions: </div>
          <div>Enter a tempo for the quarter note pulse.</div>
          <div>
            <span style={{ fontWeight: 600 }}>
              Select the number of repetition for each bar or grouping.{" "}
            </span>
            This represents the number of times you have to clap the rhythm in
            the first bar before it is replaced with the rhythm in the second
            bar and a new one is generated.
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>
              Use the checkboxes to select the groupings you want to practice.
            </span>
            Selecting more than one will generate a random mix of values.
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>
              Select the mode of operation:
            </span>
            <div>
              Bar means that clicks are played every quarter note. This gives
              you a reference within the bar to follow along with.
            </div>
            <div>
              Tuplet means only one click per bar, as if the figure was a tuplet
              equal to the numerator value of the time signature.
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default RhythmPractice;
