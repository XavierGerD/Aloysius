import React, { Component } from "react";
import { connect } from "react-redux";
import CardHolder from "./CardHolder.js";
import { uuid } from "uuidv4";

class UnconnectedQuestion extends Component {
  nextExercise = () => {
    console.log("Next one!");
  };
  render = () => {
    console.log("rendering questions");
    return (
      <div>
        <div className="answerBox">
          {this.props.cards.map(card => {
            return (
              <CardHolder
                key={uuid()}
                holderId={uuid()}
                cardId={uuid()}
                name={card}
              />
            );
          })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    cards: state.missingNoteCards
  };
};

let Question = connect(mapStateToProps)(UnconnectedQuestion);

export default Question;
