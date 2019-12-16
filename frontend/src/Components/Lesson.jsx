import React, { Component } from "react";
import { uuid } from "uuidv4";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./lesson.css";
import Viewer from "./music_viewer/viewer";
import Animation1 from "./Animation1.jsx";

class UnconnectedLesson extends Component {
  componentWillUnmount = () => {
    this.props.dispatch({
      type: "lesson-complete"
    });
  };

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
      console.log("this.props.blockType", this.props.blockType);
      if (this.props.blockType === "lesson") {
        console.log("Rerendering due to lesson");
        this.props.dispatch({ type: "complete-block" });
      }
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
        type: "lesson-complete",
        payload: parsed.progress
      });
    }
  };

  render = () => {
    return (
      <div>
        {this.props.lesson.map((chunk, i) => {
          // console.log("chunk", chunk.heading);
          if (chunk.type === "text") {
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
          }
          if (chunk.type === "score") {
            console.log("redering viewer");
            // this.props.dispatch({ type: "start-exercise" });
            let currentExercise = Math.floor(Math.random() * chunk.text.length);
            return (
              <Viewer
                key={uuid()}
                lessonId={currentExercise}
                lesson={chunk.text[currentExercise]}
              />
            );
          }
          if (chunk.type === "animation1") {
            return <Animation1 />;
          }
        })}

        <Link
          to={"/skilltree/" + this.props.topic}
          onClick={this.lessonComplete}
        >
          {/* {this.props.completed ?  */}
          <div className="buttonHolder">
            <div className="button1">GOT IT!</div>
          </div>
          {/* : null} */}
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
    permission: state.permission,
    blockType: state.currentBlockType
  };
};

let Lesson = connect(mapStateToProps)(UnconnectedLesson);

export default Lesson;
