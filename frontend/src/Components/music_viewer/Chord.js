import React, { Component } from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import "./Note.css";
import {
  stem,
  clefCodes,
  ledgerLine,
  flagCodes,
  beamCodes
} from "./UnicodeAssignment.js";
import Note from "./Note.js";

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
  if (
    Math.abs(farthestDown - middleOfStaff) >
    Math.abs(farthestUp - middleOfStaff)
  ) {
    stemDirection = "upStem";
  }
  if (
    Math.abs(farthestDown - middleOfStaff) <
    Math.abs(farthestUp - middleOfStaff)
  ) {
    stemDirection = "downStem";
  }
  if (
    Math.abs(farthestDown - middleOfStaff) ===
      Math.abs(farthestUp - middleOfStaff) &&
    Math.abs(farthestDown - middleOfStaff) > 0
  ) {
    stemDirection = "upStem";
  }
  if (
    Math.abs(farthestDown - middleOfStaff) ===
      Math.abs(farthestUp - middleOfStaff) &&
    Math.abs(farthestDown - middleOfStaff) < 0
  ) {
    stemDirection = "downStem";
  }
  if (
    Math.abs(farthestDown - middleOfStaff) ===
      Math.abs(farthestUp - middleOfStaff) &&
    Math.abs(farthestDown - middleOfStaff) === 0
  ) {
    stemDirection = "upStem";
  }
  return stemDirection;
};

let findLedgerLines = (offset, baseOffset) => {
  let ledgerLines = [];
  if (offset >= baseOffset * 2) {
    let numberOfLedgers = Math.floor(offset / (baseOffset * 2));
    for (let i = 0; i < numberOfLedgers; i++) {
      let ledgerOffset = {
        marginTop: i * baseOffset * -2 + "px"
      };
      if (!Number.isInteger(offset)) {
        ledgerOffset = {
          marginTop: i * baseOffset * -2 - baseOffset + "px"
        };
      }
      console.log("offset", offset);
      ledgerLines.push(
        <div key={uuid()} className="ledgerLine" style={ledgerOffset}>
          {ledgerLine}
        </div>
      );
    }
  }
  return ledgerLines;
};

class UnconnectedChord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beatNumber: this.props.beatNumber,
      barNumber: this.props.barNumber,
      hand: this.props.hand,
      pitch: undefined
    };
  }

  render = () => {
    let baseOffset = this.props.fontSize / 8;
    let pitchOffset = {
      C: baseOffset * 9 + "",
      D: baseOffset * 8 + "",
      E: baseOffset * 7 + "",
      F: baseOffset * 6 + "",
      G: baseOffset * 5 + "",
      A: baseOffset * 4 + "",
      B: baseOffset * 3 + ""
    };
    let octaveSize = this.props.fontSize / 8 * 7;
    let middleOfStaff = baseOffset * 3 - octaveSize;
    return (
      <React.Fragment>
        {this.props.char.pitch.map((pitch, i) => {
          this.state.pitch = i;
          let octaveMultiplier = findOctave(
            this.props.char.pitch,
            i,
            this.props.clef
          );

          let offset =
            parseFloat(clefCodes[this.props.clef].noteOffset) *
              this.props.fontSize +
            parseFloat(pitchOffset[this.props.char.pitch[i].note]) -
            octaveMultiplier * octaveSize;

          let ledgerLines = findLedgerLines(offset, baseOffset);

          let noteHeadsOffsets = [];
          this.props.char.pitch.map((arr, j) => {
            let octaveMultiplier = findOctave(
              this.props.char.pitch,
              j,
              this.props.clef
            );
            return noteHeadsOffsets.push(
              parseFloat(clefCodes[this.props.clef].noteOffset) *
                this.props.fontSize +
                parseFloat(pitchOffset[this.props.char.pitch[j].note]) -
                octaveMultiplier * octaveSize
            );
          });

          let farthestDown = Math.max(...noteHeadsOffsets);
          let farthestUp = Math.min(...noteHeadsOffsets);

          let stemDirection = findStemDirection(
            middleOfStaff,
            farthestDown,
            farthestUp
          );

          let flag;
          let flagClass = "noFlag";

          if (this.props.char.code === "eighth") {
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

          if (this.props.char.code === "sixteenth") {
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

          let style = {
            marginTop: offset + "px"
          };

          let hitBox = {
            height: this.props.fontSize / 6,
            width:
              this.props.char.code === "whole"
                ? this.props.fontSize / 2
                : this.props.fontSize / 3,
            paddingTop: this.props.fontSize / 8 + "px",
            marginTop: this.props.fontSize / -8 + "px"
          };

          return (
            <Note
              style={style}
              hitBox={hitBox}
              ledgerLines={ledgerLines}
              code={this.props.char.code}
              stemDirection={stemDirection}
              stem={stem}
              barNumber={this.state.barNumber}
              beatNumber={this.state.beatNumber}
              hand={this.state.hand}
              x1={0}
              x2={40}
              y={0}
              fontSize={this.props.fontSize}
              className={flagClass}
              flag={flag}
              pitch={i}
            />
          );
        })}
      </React.Fragment>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBlock: state.currentBlock
  };
};
let Chord = connect(mapStateToProps)(UnconnectedChord);
export default Chord;
