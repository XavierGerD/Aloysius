import React, { Component } from "react";
import { connect } from "react-redux";
import { allowDrop } from "./dragAndDrop.js";
import "./dragAndDrop.css";

class UnconnectedMissingNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holderId: this.props.holderId
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "card-positions",
      card: undefined,
      holder: this.state.holderId
    });
    this.props.dispatch({
      type: "dragdrop-values",
      card: this.state.holderId,
      value: this.props.expectedAnswer
    });
  };

  drop = e => {
    e.preventDefault();
    let data = JSON.parse(e.dataTransfer.getData("text"));
    console.log("data ID", data.id);
    let toAppend = document.getElementById(data.id);
    if (toAppend !== e.target) e.target.appendChild(toAppend);
    this.props.dispatch({
      type: "card-positions",
      card: data.id,
      holder: this.state.holderId
    });
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
