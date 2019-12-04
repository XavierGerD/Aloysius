import React, { Component } from "react";
import { uuid } from "uuidv4";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./lesson.css";
import Viewer from "./music_viewer/viewer";

class UnconnectedLesson extends Component {
  componentDidMount = async () => {
    let id = this.props.id;
    let data = new FormData();
    data.append("id", id);
    let response = await fetch("/post-block", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.dispatch({ type: "blocks", payload: parsed.rows });
    }
  };

  lessonComplete = async () => {
    let data = new FormData();
    data.append("username", this.props.user.username);
    data.append("blockID", this.props.id);
    let response = await fetch("/update-progress", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.dispatch({
        type: "lessonComplete",
        payload: parsed.progress
      });
    }
  };

  render = () => {
    if (this.props.lesson[0]) {
      // console.log("lesson", this.props.lesson[0].type);
    }
    return (
      <div>
        {this.props.lesson.map((chunk, i) => {
          // console.log("chunk", chunk.heading);
          if (chunk.heading !== "score") {
            return (
              <div key={uuid()}>
                <div className="lessonHeader">
                  <h1>
                    {chunk.heading}
                  </h1>
                </div>
                <div className="lessonBody">
                  {chunk.text}
                </div>
              </div>
            );
          } else if (chunk.heading === "score") {
            let currentExercise = Math.floor(Math.random() * chunk.text.length);
            return <Viewer key={uuid()} lesson={chunk.text[currentExercise]} />;
          }
        })}

        <Link
          to={"/skilltree/" + this.props.topic}
          onClick={this.lessonComplete}
        >
          {this.props.completed
            ? <div className="buttonHolder">
                <div className="button1">GOT IT!</div>
              </div>
            : null}
        </Link>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    lesson: state.currentBlock,
    user: state.user,
    topic: state.currentTopic,
    completed: state.currentBlockComplete,
    permission: state.permission
  };
};

let Lesson = connect(mapStateToProps)(UnconnectedLesson);

export default Lesson;
