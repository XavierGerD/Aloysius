import React, { Component } from "react";
import { connect } from "react-redux";
import CardHolder from "./CardHolder.js";
import { uuid } from "uuidv4";

class Question extends Component {
  nextExercise = () => {
    console.log("Next one!");
  };
  render = () => {
    console.log("rendering questions");
    return (
      <div>
        <div className="answerBox">
          <CardHolder
            key={uuid()}
            holderId={uuid()}
            cardId={uuid()}
            name="quarter"
          />
          <CardHolder
            key={uuid()}
            holderId={uuid()}
            cardId={uuid()}
            name="half"
          />
          <CardHolder
            key={uuid()}
            holderId={uuid()}
            cardId={uuid()}
            name="whole"
          />
        </div>
      </div>
    );
  };
}

export default Question;
