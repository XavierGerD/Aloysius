import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSubmitControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: this.props.lessonId
    };
  }
  submitAnswers = e => {
    e.preventDefault();
    this.props.dispatch({ type: "submit-answers" });
  };

  nextExercise = () => {
    this.props.dispatch({
      type: "next-exercise",
      lessonId: this.state.lessonId
    });
  };

  render = () => {
    return (
      <div>
        {this.props.permission === "user" && !this.props.rightAnswer
          ? <div className="buttonHolder">
              <div className="button1" onClick={this.submitAnswers}>
                Submit!
              </div>
            </div>
          : null}
        <div style={{ marginTop: "30px" }}>
          {this.props.answerSubmitted && !this.props.rightAnswer
            ? <div>Wrong answer!</div>
            : null}
        </div>
        <div>
          {this.props.answerSubmitted && this.props.rightAnswer
            ? <div className="buttonHolder">
                <div className="button2" onClick={this.nextExercise}>
                  Next exercise
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
    permission: state.permission,
    answerSubmitted: state.answerSubmitted,
    rightAnswer: state.rightAnswer
  };
};

let SubmitControls = connect(mapStateToProps)(UnconnectedSubmitControls);

export default SubmitControls;
