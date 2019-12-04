import React, { Component } from "react";
import { connect } from "react-redux";
import { allowDrop } from "./dragAndDrop.js";
import "./dragAndDrop.css";

class UnconnectedMissingNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expectedAnswer: this.props.expectedAnswer,
      position: this.props.position,
      barNumber: this.props.barNumber,
      rightAnswer: false
    };
  }

  drop = (e, elem) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
    console.log("Data", data);
    if (this.props.expectedAnswer === data) {
      console.log("This is the right answer");
      this.props.dispatch({
        type: "add-answer",
        expectedAnswer: this.state.expectedAnswer,
        barNumber: this.state.barNumber,
        position: this.state.position
      });
    }
    e.dataTransfer.clearData();
  };

  render = () => {
    return (
      <div
        onDrop={event => this.drop(event)}
        onDragOver={event => allowDrop(event)}
        className="missingStaffNote"
      />
    );
  };
}

let MissingNote = connect()(UnconnectedMissingNote);

export default MissingNote;
