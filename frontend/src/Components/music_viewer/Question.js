import React, { Component } from "react";
import { connect } from "react-redux";
import CardHolder from "./CardHolder.js";
import { uuid } from "uuidv4";

class UnconnectedQuestion extends Component {
  submitAnswers = () => {
    this.props.dispatch({ type: "submit-answers" });
  };
  render = () => {
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
          {this.props.permission === "user"
            ? <div className="buttonHolder">
                <div className="button1" onClick={this.submitAnswers}>
                  Submit!
                </div>
              </div>
            : null}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    permission: state.permission
  };
};
let Question = connect(mapStateToProps)(UnconnectedQuestion);

export default Question;
