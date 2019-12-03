import React, { Component } from "react";
import { uuid } from "uuidv4";
import { barlines } from "./UnicodeAssignment.js";
import { allowDrop, drop } from "./dragAndDrop.js";
import Chord from "./Chord.js";
import Rest from "./Rest.js";
import "./Bar.css";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barNumber: this.props.j,
      hand: this.props.i
    };
  }
  render = () => {
    let { hand, clef, length, index, instrument, i } = this.props;
    let barLineType;
    if (index < length - 1) {
      barLineType = barlines.singleBarline;
      if (instrument === "piano") {
        barLineType = <div className="barLineDiv" />;
        if (i > 0) {
          barLineType = null;
        }
      }
    } else {
      barLineType = barlines.finalBarline;
      if (instrument === "piano") {
        barLineType = (
          <div className="finalBarLineDiv">
            <div className="barLineDiv" />
            <div className="blankFinalBarLineDiv" />
            <div className="wideBarLineDiv" />
          </div>
        );
        if (i > 0) {
          barLineType = null;
        }
      }
    }
    let beat = [];
    let beatCounter = 0;
    return (
      <React.Fragment>
        <div className="bar">
          {" "}{hand.map((char, i) => {
            let style;
            if (char.type === "note") {
              if (beatCounter === 0) {
                beat = [];
              }

              switch (char.code) {
                case "sixteenth":
                  beat.push(
                    <div key={uuid()} className="note">
                      <Chord
                        key={uuid()}
                        char={char}
                        clef={clef}
                        fontSize={this.props.fontSize}
                        barNumber={this.state.barNumber}
                        hand={this.state.hand}
                        beatNumber={i}
                      />
                    </div>
                  );
                  beatCounter += 1;
                  break;
                case "eighth":
                  beat.push(
                    <div key={uuid()} className="note">
                      <Chord
                        key={uuid()}
                        char={char}
                        clef={clef}
                        fontSize={this.props.fontSize}
                        barNumber={this.state.barNumber}
                        hand={this.state.hand}
                        beatNumber={i}
                      />
                    </div>
                  );
                  beatCounter += 2;
                  break;
                case "half":
                  return (
                    <div key={uuid()} className="note">
                      <Chord
                        key={uuid()}
                        char={char}
                        clef={clef}
                        fontSize={this.props.fontSize}
                        barNumber={this.state.barNumber}
                        hand={this.state.hand}
                        beatNumber={i}
                      />
                      <div className="empty" />
                    </div>
                  );

                case "whole":
                  return (
                    <div key={uuid()} className="note">
                      <Chord
                        key={uuid()}
                        char={char}
                        clef={clef}
                        fontSize={this.props.fontSize}
                        barNumber={this.state.barNumber}
                        hand={this.state.hand}
                        beatNumber={i}
                      />
                      <div className="empty" />
                      <div className="empty" />
                      <div className="empty" />
                    </div>
                  );
                default:
                  return (
                    <div key={uuid()} className="note">
                      <Chord
                        key={uuid()}
                        char={char}
                        clef={clef}
                        fontSize={this.props.fontSize}
                        barNumber={this.state.barNumber}
                        hand={this.state.hand}
                        beatNumber={i}
                      />
                    </div>
                  );
              }

              if (beatCounter >= 4) {
                beatCounter = 0;
                return (
                  <div key={uuid()} className="note">
                    {beat}
                  </div>
                );
              } else return;
            }
            if (char.type === "rest") {
              console.log("beat number in bar component", i);
              return (
                <div key={uuid()} className="note">
                  <Rest
                    code={char.code}
                    fontSize={this.props.fontSize}
                    barNumber={this.state.barNumber}
                    hand={this.state.hand}
                    beatNumber={i}
                  />
                </div>
              );
            }
            if (char.type === "missing") {
              style = { marginTop: this.props.fontSize / 8 * 7 + "px" };
              return (
                <div
                  onDrop={event => drop(event)}
                  onDragOver={event => allowDrop(event)}
                  className="missingNote"
                  style={style}
                />
              );
            }

            return (
              <div className="characterText" style={style}>
                {char.code}
              </div>
            );
          })}
        </div>
        <div className="barLineText">
          {barLineType}
        </div>
      </React.Fragment>
    );
  };
}

export default Bar;
