import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProgressBar.css";

class UnconnectedProgressBar extends Component {
  render = () => {
    let maxProgress = 100 / this.props.maxProgress;
    let currentProgress = maxProgress * this.props.currentProgress;
    let color;
    if (currentProgress < 45) {
      color = "#ff9c00";
    } else if (currentProgress < 100 && currentProgress >= 45) {
      color = "#ffea1b";
    } else if (currentProgress >= 100) {
      color = "#00de4f";
    }

    let style = {
      backgroundColor: color,
      width: 1200 / this.props.maxProgress * this.props.currentProgress + "px"
    };

    return (
      <div className="progressContainer">
        <div className="progressBar" style={style} />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    currentProgress: state.currentProgress,
    maxProgress: state.maxProgress
  };
};

let ProgressBar = connect(mapStateToProps)(UnconnectedProgressBar);

export default ProgressBar;
