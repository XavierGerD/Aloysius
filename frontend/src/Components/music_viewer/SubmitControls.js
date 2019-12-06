import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSubmitControls extends Component {
  submitAnswers = e => {
    e.preventDefault();
    this.props.dispatch({ type: "submit-answers" });
  };

  render = () => {
    return (
      <div>
        {this.props.permission === "user"
          ? <div className="buttonHolder">
              <div className="button1" onClick={this.submitAnswers}>
                Submit!
              </div>
            </div>
          : null}
        <div style={{ marginTop: "50px" }}>
          {this.props.answerSubmitted && !this.props.rightAnswer
            ? <div style={{ position: "relative" }}>Wrong answer!</div>
            : null}
          {this.props.answerSubmitted && this.props.rightAnswer
            ? <div style={{ position: "relative" }}>
                <div>Right answer!</div>
                <div onClick={this.nextExercise}>Next exercise</div>
              </div>
            : null}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    permission: state.permission,
    answerSubmitted: state.answerSubmitted,
    rightAnswer: state.rightAnswer
  };
};

let SubmitControls = connect(mapStateToProps)(UnconnectedSubmitControls);

export default SubmitControls;
