import React, { Component } from "react";
import { connect } from "react-redux";
import AnswerCard from "./AnswerCard.js";
import { uuid } from "uuidv4";

class UnconnectedCardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holderId: this.props.holderId
    };
  }

  allowDrop = e => {
    e.preventDefault();
  };

  drop = (e, elem) => {
    e.preventDefault();
    let data = JSON.parse(e.dataTransfer.getData("text"));
    console.log("data ID", data.id);
    let toAppend = document.getElementById(data.id);
    if (toAppend !== e.target) e.target.appendChild(toAppend);
    this.props.dispatch({
      type: "remove-card",
      card: data.id
    });
    e.dataTransfer.clearData();
  };

  render = () => {
    return (
      <div
        className="missingNote"
        id={this.props.holderId}
        onDrop={event => this.drop(event)}
        onDragOver={event => this.allowDrop(event)}
      >
        <AnswerCard key={uuid()} cardId={uuid()} name={this.props.name} />
      </div>
    );
  };
}

let CardHolder = connect()(UnconnectedCardHolder);

export default CardHolder;
