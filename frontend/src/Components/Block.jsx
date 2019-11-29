import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./block.css";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    };
  }
  render = () => {
    let maxProgress = 100 / this.props.maxProgress;
    let currentProgress = maxProgress * this.props.progress;
    let color;
    if (currentProgress < 45) {
      color = "#ff9c00";
    } else if (currentProgress < 100 && currentProgress >= 45) {
      color = "#ffea1b";
    } else if (currentProgress >= 100) {
      color = "#00de4f";
    }
    let style = {
      background: `linear-gradient(to top, ${color} 0%, ${color} ${currentProgress +
        "%"}, #d1d1d1 ${currentProgress + "%"}, #d1d1d1 100%)`
    };
    return (
      <div className="icon">
        <Link
          to={{
            pathname: "/lesson/" + this.props.id,
            state: { id: this.props.id, topic: this.props.topic }
          }}
        >
          <div className={"outer" + this.props.type} style={style}>
            <div className={"white" + this.props.type}>
              <div className={"inner" + this.props.type}>
                <img src={this.props.image} className="innerimage" />
              </div>
            </div>
          </div>
        </Link>
        <div className="moduleName">
          {this.props.name}
        </div>
      </div>
    );
  };
}

export default Block;
