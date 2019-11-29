import React from "react";
import { barlines, restCodes } from "./UnicodeAssignment.js";
import { allowDrop, drop } from "./dragAndDrop.js";
import Note from "./Note.js";
import "./Bar.css";

let Bar = ({ arr, clef, length, index, state, instrument, i }) => {
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
        {" "}{arr.map(char => {
          let style;
          if (char.type === "note") {
            if (beatCounter === 0) {
              beat = [];
            }

            switch (char.code) {
              case "sixteenth":
                beat.push(
                  <div className="note">
                    <Note char={char} clef={clef} fontSize={state.fontSize} />
                  </div>
                );
                beatCounter += 1;
                break;
              case "eighth":
                beat.push(
                  <div className="note">
                    <Note char={char} clef={clef} fontSize={state.fontSize} />
                  </div>
                );
                beatCounter += 2;
                break;
              case "half":
                return (
                  <div className="note">
                    <Note char={char} clef={clef} fontSize={state.fontSize} />
                    <div className="empty" />
                  </div>
                );

              case "whole":
                return (
                  <div className="note">
                    <Note char={char} clef={clef} fontSize={state.fontSize} />
                    <div className="empty" />
                    <div className="empty" />
                    <div className="empty" />
                  </div>
                );
              default:
                return (
                  <div className="note">
                    <Note char={char} clef={clef} fontSize={state.fontSize} />
                  </div>
                );
            }

            if (beatCounter >= 4) {
              beatCounter = 0;
              return (
                <div className="note">
                  {beat}
                </div>
              );
            } else return;
          }
          if (char.type === "rest") {
            style = { marginTop: state.fontSize / -2 + "px" };
            return (
              <div className="note" style={style}>
                <div className="noteHead">
                  {restCodes[char.code]}
                </div>
              </div>
            );
          }
          if (char.type === "missing") {
            style = { marginTop: state.fontSize / 8 * 7 + "px" };
            return <div onDrop={event => drop(event)} onDragOver={event => allowDrop(event)} className="missingNote" style={style} />;
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
