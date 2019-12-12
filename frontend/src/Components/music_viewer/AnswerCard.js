import React, { Component } from "react";
import { stem, noteheadCodes, flagCodes } from "./UnicodeAssignment.js";
import { connect } from "react-redux";
import "./AnswerCard.css";

class UnconnectedAnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardId: this.props.cardId,
      name: this.props.name
    };
  }

  componentDidMount = () => {
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
    let notehead;
    switch (this.props.name) {
      case "whole":
        notehead = noteheadCodes[this.state.name];
        break;
      default:
        notehead = noteheadCodes[this.state.name] + stem;
        break;
    }
    return (
      <div
        id={this.state.cardId}
        name={this.state.name}
        draggable="true"
        onDragStart={event => this.drag(event)}
        className="answerButton"
      >
        {notehead}
        {this.props.name === "eighth"
          ? <div className="cardFlag">
              <div>
                {flagCodes.eighth.up}
              </div>
            </div>
          : null}
      </div>
    );
  };
}

let AnswerCard = connect()(UnconnectedAnswerCard);

export default AnswerCard;
