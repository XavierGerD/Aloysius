import React, { Component } from "react";
import { connect } from "react-redux";
import { allowDrop, drop, drag } from "./dragAndDrop";
import AnswerCard from "./AnswerCard.js";
import { uuid } from "uuidv4";

class UnconnectedCardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holderId: this.props.holderId
    };
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: "dragdrop-values",
      card: this.state.holderId,
      value: "holder"
    });
  };

  drop = (e, elem) => {
    e.preventDefault();
    let data = JSON.parse(e.dataTransfer.getData("text"));
    console.log("data ID", data.id);
    let toAppend = document.getElementById(data.id);
    if (toAppend !== e.target) e.target.appendChild(toAppend);
    this.props.dispatch({
      type: "move-card",
      card: data.id,
      holder: this.state.holderId
    });
    // this.props.dispatch({
    //   type: "card-values",
    //   card: data.id,
    //   holder: this.state.holderId
    // });
    e.dataTransfer.clearData();
  };

  render = () => {
    return (
      <div
        className="missingNote"
        id={this.props.holderId}
        onDrop={event => this.drop(event)}
        onDragOver={event => allowDrop(event)}
      >
        <AnswerCard
          key={uuid()}
          cardId={uuid()}
          name={this.props.name}
          parent={this.state.holderId}
        />
      </div>
    );
  };
}

let CardHolder = connect()(UnconnectedCardHolder);

export default CardHolder;
