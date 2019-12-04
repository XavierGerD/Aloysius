import React, { Component } from "react";
import { allowDrop, drop, drag } from "./dragAndDrop";
// import { stem, noteheadCodes } from "./UnicodeAssignment.js";

class Question extends Component {
  state = {
    blackNoteHead: "\uE0A4",
    wholeNoteHead: "\uE0A2",
    halfNoteHead: "\uE0A3",
    stem: "\uE210"
  };

  render = () => {
    return (
      <div className="answerBox">
        <div
          className="missingNote"
          onDrop={event => drop(event)}
          onDragOver={event => allowDrop(event)}
        >
          <input
            type="submit"
            id="quarter"
            draggable="true"
            onDragStart={event => drag(event)}
            className="answerButton"
            value={this.state.blackNoteHead + this.state.stem}
          />
        </div>
        <div
          className="missingNote"
          onDrop={event => drop(event)}
          onDragOver={event => allowDrop(event)}
        >
          <input
            type="submit"
            id="whole"
            draggable="true"
            onDragStart={event => drag(event)}
            className="answerButton"
            value={this.state.wholeNoteHead}
          />
        </div>
        <div
          className="missingNote"
          onDrop={event => drop(event)}
          onDragOver={event => allowDrop(event)}
        >
          <input
            type="submit"
            id="half"
            draggable="true"
            onDragStart={event => drag(event)}
            className="answerButton"
            value={this.state.halfNoteHead + this.state.stem}
          />
        </div>
      </div>
    );
  };
}

export default Question;
