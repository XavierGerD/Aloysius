import React from "react";
import { uuid } from "uuidv4";
import { barlines, restCodes } from "./UnicodeAssignment.js";
import { allowDrop, drop } from "./dragAndDrop.js";
import Note from "./Note.js";
import "./Bar.css";

let Bar = props => {
  let { hand, clef, length, index, instrument, i } = props;
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
        {" "}{hand.map(char => {
          let style;
          if (char.type === "note") {
            if (beatCounter === 0) {
              beat = [];
            }

            switch (char.code) {
              case "sixteenth":
                beat.push(
                  <div key={uuid()} className="note">
                    <Note
                      key={uuid()}
                      char={char}
                      clef={clef}
                      fontSize={props.fontSize}
                    />
                  </div>
                );
                beatCounter += 1;
                break;
              case "eighth":
                beat.push(
                  <div key={uuid()} className="note">
                    <Note
                      key={uuid()}
                      char={char}
                      clef={clef}
                      fontSize={props.fontSize}
                    />
                  </div>
                );
                beatCounter += 2;
                break;
              case "half":
                return (
                  <div key={uuid()} className="note">
                    <Note
                      key={uuid()}
                      char={char}
                      clef={clef}
                      fontSize={props.fontSize}
                    />
                    <div className="empty" />
                  </div>
                );

              case "whole":
                return (
                  <div key={uuid()} className="note">
                    <Note
                      key={uuid()}
                      char={char}
                      clef={clef}
                      fontSize={props.fontSize}
                    />
                    <div className="empty" />
                    <div className="empty" />
                    <div className="empty" />
                  </div>
                );
              default:
                return (
                  <div key={uuid()} className="note">
                    <Note
                      key={uuid()}
                      char={char}
                      clef={clef}
                      fontSize={props.fontSize}
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
            style = {
              height: props.fontSize,
              width: props.fontSize / 3,
              marginTop: props.fontSize / -1 + "px",
              paddingTop: props.fontSize / 2
            };

            return (
              <div key={uuid()} className="note">
                <div className="noteHead" style={style}>
                  {restCodes[char.code]}
                </div>
              </div>
            );
          }
          if (char.type === "missing") {
            style = { marginTop: props.fontSize / 8 * 7 + "px" };
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

export default Bar;
