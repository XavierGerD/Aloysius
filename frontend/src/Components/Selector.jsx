import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./selector.css";

class Selector extends Component {
  constructor() {
    super();
    this.state = {
      topics: []
    };
  }
  componentDidMount = async () => {
    if (this.props.teacherCourse !== undefined) {
      return;
    }
    let response = await fetch("/post-course", {
      method: "POST"
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.setState({ topics: parsed.rows });
    }
  };

  render = () => {
    return (
      <div className="selectorDiv">
        <div>Welcome to Aloysius</div>
        <div>
          Please select the topic you wish to follow. We recommend following the
          topics in order
        </div>
        {this.state.topics.map(topic => {
          return (
            <Link to={"/skilltree/" + topic.title} topic={topic.title}>
              <div className="topicBox">
                <div className="topicName">
                  {topic.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
}

export default Selector;
