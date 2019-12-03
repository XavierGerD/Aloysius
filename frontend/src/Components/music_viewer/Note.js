import React, { Component } from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import "./Note.css";
import { stem, noteheadCodes } from "./UnicodeAssignment.js";
import Beam from "./Beam.js";
import * as R from "ramda";

class UnconnectedNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beatNumber: this.props.beatNumber,
      barNumber: this.props.barNumber,
      hand: this.props.hand,
      pitch: this.props.pitch
    };
  }

  deleteMe = () => {
    let block = R.clone(this.props.currentBlock[1].text);
    let chord =
      block.notes.notes[this.state.barNumber][this.state.hand][
        this.state.beatNumber
      ].pitch;
    chord.splice(this.state.pitch, 1);
    if (chord.length === 0) {
      block.notes.notes[this.state.barNumber][this.state.hand][
        this.state.beatNumber
      ] = {
        type: "rest",
        code:
          block.notes.notes[this.state.barNumber][this.state.hand][
            this.state.beatNumber
          ].code
      };
    }
    this.props.dispatch({ type: "update-block", payload: block });
  };

  render = () => {
    return (
      <div
        key={uuid()}
        className="noteBox"
        style={this.props.style}
        onClick={this.deleteMe}
      >
        {this.props.ledgerLines}
        <div className="noteHead" style={this.props.otherStyle}>
          {noteheadCodes[this.props.code]}
        </div>
        <div className={this.props.stemDirection}>
          {this.props.code === "whole" ? null : stem}
          <Beam
            x1={0}
            x2={40}
            y={0}
            fontSize={this.props.fontSize}
            code={this.props.code}
            className={this.props.flagClass}
          />
          {/* <div className={flagClass}>
                {flag}
              </div> */}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBlock: state.currentBlock
  };
};
let Note = connect(mapStateToProps)(UnconnectedNote);

export default Note;
