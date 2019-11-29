import React from "react";
import "./Note.css";
import { stem, noteheadCodes, clefCodes, ledgerLine, flagCodes, beamCodes } from "./UnicodeAssignment.js";
import Beam from "./Beam.js";
import Beamhook from "./Beamhook.js";

let findOctave = (pitch, i, clef) => {
  let octaveMultiplier;
  switch (clef) {
    case "treble":
      octaveMultiplier = pitch[i].octave - 3;
      break;
    case "bass":
      octaveMultiplier = pitch[i].octave - 1;
      break;
    case "alto":
      octaveMultiplier = pitch[i].octave - 2;
      break;
    default:
      return;
  }

  return octaveMultiplier;
};

let findStemDirection = (middleOfStaff, farthestDown, farthestUp) => {
  let stemDirection;
  if (Math.abs(farthestDown - middleOfStaff) > Math.abs(farthestUp - middleOfStaff)) {
    stemDirection = "upStem";
  }
  if (Math.abs(farthestDown - middleOfStaff) < Math.abs(farthestUp - middleOfStaff)) {
    stemDirection = "downStem";
  }
  if (Math.abs(farthestDown - middleOfStaff) === Math.abs(farthestUp - middleOfStaff) && Math.abs(farthestDown - middleOfStaff) > 0) {
    stemDirection = "upStem";
  }
  if (Math.abs(farthestDown - middleOfStaff) === Math.abs(farthestUp - middleOfStaff) && Math.abs(farthestDown - middleOfStaff) < 0) {
    stemDirection = "downStem";
  }
  if (Math.abs(farthestDown - middleOfStaff) === Math.abs(farthestUp - middleOfStaff) && Math.abs(farthestDown - middleOfStaff) === 0) {
    stemDirection = "upStem";
  }
  return stemDirection;
};

let findLedgerLines = (offset, baseOffset) => {
  let ledgerLines = [];
  if (offset >= baseOffset * 2) {
    let numberOfLedgers = Math.floor(offset / (baseOffset * 2));
    for (let i = 0; i < numberOfLedgers; i++) {
      let ledgerOffset = { marginTop: (i + 1) * baseOffset * 2 + "px" };
      ledgerLines.push(
        <div className="ledgerLine" style={ledgerOffset}>
          {ledgerLine}
        </div>
      );
    }
  }
  return ledgerLines;
};

let Note = props => {
  let baseOffset = props.fontSize / 8;
  let pitchOffset = {
    C: baseOffset * 9 + "",
    D: baseOffset * 8 + "",
    E: baseOffset * 7 + "",
    F: baseOffset * 6 + "",
    G: baseOffset * 5 + "",
    A: baseOffset * 4 + "",
    B: baseOffset * 3 + ""
  };
  let octaveSize = props.fontSize / 8 * 7;
  let middleOfStaff = baseOffset * 3 - octaveSize;
  return (
    <React.Fragment>
      {props.char.pitch.map((pitch, i) => {
        let octaveMultiplier = findOctave(props.char.pitch, i, props.clef);

        let offset =
          parseFloat(clefCodes[props.clef].noteOffset) * props.fontSize +
          parseFloat(pitchOffset[props.char.pitch[i].note]) -
          octaveMultiplier * octaveSize;

        let style = {
          marginTop: offset + "px"
        };

        let ledgerLines = findLedgerLines(offset, baseOffset);

        let noteHeadsOffsets = [];
        props.char.pitch.map((arr, j) => {
          let octaveMultiplier = findOctave(props.char.pitch, j, props.clef);
          noteHeadsOffsets.push(
            parseFloat(clefCodes[props.clef].noteOffset) * props.fontSize +
              parseFloat(pitchOffset[props.char.pitch[j].note]) -
              octaveMultiplier * octaveSize
          );
        });

        let farthestDown = Math.max(...noteHeadsOffsets);
        let farthestUp = Math.min(...noteHeadsOffsets);

        let stemDirection = findStemDirection(middleOfStaff, farthestDown, farthestUp);

        let flag;
        let flagClass = "noFlag";

        if (props.char.code === "eighth") {
          if (stemDirection === "upStem") {
            if (offset === farthestUp) {
              flag = beamCodes.eighth;
              flagClass = "beamUp";
              // flag = flagCodes.eighth.up;
              // flagClass = "flagUp";
            }
          } else {
            if (offset === farthestDown) {
              flag = flagCodes.eighth.down;
              flagClass = "flagDown";
            }
          }
        }

        if (props.char.code === "sixteenth") {
          if (stemDirection === "upStem") {
            if (offset === farthestUp) {
              flag = beamCodes.sixteenth;
              flagClass = "beamUp";
              // flag = flagCodes.sixteenth.up;
              // flagClass = "flagUp";
            }
          } else {
            if (offset === farthestDown) {
              flag = flagCodes.sixteenth.down;
              flagClass = "flagDown";
            }
          }
        }

        return (
          <div className="noteHead">
            {ledgerLines}
            <div className="noteHead" style={style}>
              {noteheadCodes[props.char.code]}
            </div>
            <div className={stemDirection} style={style}>
              {props.char.code === "whole" ? null : stem}
              <Beam x1={0} x2={40} y={0} fontSize={props.fontSize} code={props.char.code} className={flagClass} />
              {/* <div className={flagClass}>
                {flag}
              </div> */}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Note;
