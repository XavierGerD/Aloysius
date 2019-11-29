import React, { Component } from "react";
import { allowDrop, drop, drag } from "./dragAndDrop";

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
        <div className="maintext">What is the missing note value in this phrase?</div>
        <div style={{ display: "flex", width: "150px" }}>
          <div className="missingNote" onDrop={event => drop(event)} onDragOver={event => allowDrop(event)}>
            <input
              type="submit"
              id="1"
              draggable="true"
              onDragStart={event => drag(event)}
              onDrop="return false"
              onDragover="return false"
              className="answerButton"
              value={this.state.blackNoteHead + this.state.stem}
            />
          </div>
          <div className="missingNote" onDrop={event => drop(event)} onDragOver={event => allowDrop(event)}>
            <input
              type="submit"
              id="2"
              draggable="true"
              onDragStart={event => drag(event)}
              onDrop="return false"
              onDragover="return false"
              className="answerButton"
              value={this.state.wholeNoteHead}
            />
          </div>
          <div className="missingNote" onDrop={event => drop(event)} onDragOver={event => allowDrop(event)}>
            <input
              type="submit"
              id="3"
              draggable="true"
              onDragStart={event => drag(event)}
              onDrop="return false"
              onDragover="return false"
              className="answerButton"
              value={this.state.halfNoteHead + this.state.stem}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Question;
