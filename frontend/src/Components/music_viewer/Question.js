import React, { Component } from "react";
import { connect } from "react-redux";
import CardHolder from "./CardHolder.js";
import { uuid } from "uuidv4";

let noteValues = ["whole", "half", "quarter", "eighth"];

class UnconnectedQuestion extends Component {
  nextExercise = () => {
    console.log("Next one!");
  };
  render = () => {
    let cards = [...this.props.cards];
    let randomNumberOfCards = Math.floor(Math.random() * 3 + 1);
    for (let i = 0; i < randomNumberOfCards; i++) {
      cards = cards.concat([
        noteValues[Math.floor(Math.random() * noteValues.length)]
      ]);
    }
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    console.log("cards", cards);
    console.log("random number of cards", randomNumberOfCards);
    // console.log("rendering questions");
    return (
      <div>
        <div className="answerBox">
          {cards.map(card => {
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
