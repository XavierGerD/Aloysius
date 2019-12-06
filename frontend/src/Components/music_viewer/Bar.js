import React, { Component } from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { barlines } from "./UnicodeAssignment.js";
import MissingNote from "./MissingNote.js";

import Chord from "./Chord.js";
import Rest from "./Rest.js";
import "./Bar.css";
import "./dragAndDrop.css";

class UnconnectedBar extends Component {
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
    let missingNotePosition = 0;
    return (
      <React.Fragment>
        <div className="bar">
          {" "}{hand.map((char, i) => {
            if (beatCounter === 0) {
              beat = [];
            }
            if (char.type === "note") {
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
            }
            if (char.type === "rest") {
              beat.push(
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
              // let payloadObject = {};
              // payloadObject.type = char.code;
              // payloadObject.rightAnswer = false;
              // payloadObject.barNumber = this.state.barNumber;
              // payloadObject.position = missingNotePosition;
              // this.props.dispatch({
              //   type: "total-answers",
              //   payload: payloadObject
              // });
              beat.push(
                <MissingNote
                  expectedAnswer={char.code}
                  position={missingNotePosition}
                  barNumber={this.state.barNumber}
                  key={uuid()}
                  holderId={uuid()}
                />
              );
              missingNotePosition += 1;
            }

            switch (char.code) {
              case "sixteenth":
                beatCounter += 1;
                break;
              case "eighth":
                beatCounter += 2;
                break;
              case "quarter":
                beatCounter += 4;
                break;
              case "half":
                beatCounter += 8;
                beat.push(
                  <div key={uuid()} className="note">
                    <div className="empty" />
                  </div>
                );
                break;
              case "whole":
                beatCounter += 16;
                for (let i = 0; i < 3; i++) {
                  beat.push(
                    <div key={uuid()} className="note">
                      <div className="empty" />
                    </div>
                  );
                }
                break;

              default:
                return;
            }
            if (beatCounter >= 4) {
              beatCounter = 0;
              return (
                <div key={uuid()} className="note">
                  {beat}
                </div>
              );
            } else return;
          })}
        </div>
        <div className="barLineText">
          {barLineType}
        </div>
      </React.Fragment>
    );
  };
}

let Bar = connect()(UnconnectedBar);
export default Bar;
