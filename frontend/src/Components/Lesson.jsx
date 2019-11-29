import React, { Component } from "react";
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
      console.log("lesson", this.props.lesson[0].type);
    }
    return (
      <div>
        {this.props.lesson.map(chunk => {
          if (chunk.heading !== "") {
            return (
              <div>
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
          } else {
            return <Viewer />;
          }
        })}
        <Link
          to={"/skilltree/" + this.props.topic}
          onClick={this.lessonComplete}
        >
          <div className="buttonHolder">
            <div className="button1">GOT IT!</div>
          </div>
        </Link>
      </div>
    );
    // }
    return null;
  };
}

let mapStateToProps = state => {
  return {
    lesson: state.currentBlock,
    user: state.user,
    topic: state.currentTopic
  };
};

let Lesson = connect(mapStateToProps)(UnconnectedLesson);

export default Lesson;
