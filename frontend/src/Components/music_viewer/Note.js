import React, { Component } from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import "./Note.css";
import { stem, noteheadCodes, flagCodes } from "./UnicodeAssignment.js";
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
    if (this.props.permission !== "user") {
      let block = R.clone(this.props.currentBlock[1].text);
      let chord =
        block.notes.notes[this.state.barNumber][this.state.hand][
          this.state.beatNumber
        ].pitch;
      let beatNumber =
        block.notes.notes[this.state.barNumber][this.state.hand][
          this.state.beatNumber
        ];
      chord.splice(this.state.pitch, 1);
      if (chord.length === 0) {
        console.log(
          "hand",
          block.notes.notes[this.state.barNumber][this.state.hand]
        );
        console.log("beatNumber", beatNumber);
        block.notes.notes[this.state.barNumber][this.state.hand][
          this.state.beatNumber
        ] = {
          type: "rest",
          code: beatNumber.code
        };
      }
      this.props.dispatch({ type: "update-block", payload: block });
    }
  };

  render = () => {
    console.log("flag class", this.props.flagClass);
    return (
      <div key={uuid()} className="noteBox" style={this.props.style}>
        {this.props.ledgerLines}
        <div
          className="noteHead"
          style={this.props.hitBox}
          onClick={this.deleteMe}
        >
          {noteheadCodes[this.props.code]}
        </div>
        <div className={this.props.stemDirection}>
          {this.props.code === "whole" ? null : stem}
          {/* <Beam
            x1={0}
            x2={40}
            y={0}
            fontSize={this.props.fontSize}
            code={this.props.code}
            className={this.props.flagClass}
          /> */}
          <div className={this.props.flagClass}>
            {this.props.flag}
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentBlock: state.currentBlock,
    permission: state.permission
  };
};
let Note = connect(mapStateToProps)(UnconnectedNote);

export default Note;
