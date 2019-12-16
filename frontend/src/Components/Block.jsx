import React, { Component } from "react";
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
    if (currentProgress === 0) {
      color = "#d1d1d1";
    } else if (currentProgress > 0 && currentProgress < 45) {
      color = "#ff9c00";
    } else if (currentProgress < 100 && currentProgress >= 45) {
      color = "#ffea1b";
    } else if (currentProgress >= 100) {
      color = "#00de4f";
    }
    let style = {
      backgroundColor: color,
      width: 105 / this.props.maxProgress * this.props.currentProgress + "px"
    };
    return (
      <div className="icon">
        <Link
          to={{
            pathname: "/lesson/" + this.props.id,
            state: { id: this.props.id, topic: this.props.topic }
          }}
        >
          <div className={"outer" + this.props.type}>
            <div className="innerGradient" style={style}>
              <div className={"white" + this.props.type}>
                <div className={"inner" + this.props.type}>
                  <img
                    src={"/Icons/" + this.props.image}
                    className="innerimage"
                    alt=""
                  />
                </div>
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
