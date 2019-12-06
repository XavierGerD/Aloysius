import React, { Component } from "react";
import { stem, noteheadCodes } from "./UnicodeAssignment.js";
import { connect } from "react-redux";

class UnconnectedAnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardId: this.props.cardId,
      name: this.props.name,
      parent: this.props.parent
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "card-positions",
      card: this.state.cardId,
      holder: this.state.parent
    });
    this.props.dispatch({
      type: "dragdrop-values",
      card: this.state.cardId,
      value: this.state.name
    });
  };

  drag = e => {
    let cardData = JSON.stringify({ id: e.target.id, value: e.target.name });
    e.dataTransfer.setData("text/plain", cardData);
    console.log("data", e.target.id);
  };

  render = () => {
    return (
      <input
        type="submit"
        id={this.state.cardId}
        name={this.state.name}
        draggable="true"
        onDragStart={event => this.drag(event)}
        className="answerButton"
        value={
          this.props.name === "whole"
            ? noteheadCodes[this.state.name]
            : noteheadCodes[this.state.name] + stem
        }
      />
    );
  };
}

let AnswerCard = connect()(UnconnectedAnswerCard);

export default AnswerCard;
