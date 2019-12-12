import React, { Component } from "react";
import { connect } from "react-redux";

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
    // console.log("max progress", maxProgress);
    // console.log("current progress", currentProgress);
    let style = {
      background: `linear-gradient(to right, ${color} 0%, ${color} ${currentProgress +
        "%"}, #d1d1d1 ${currentProgress + "%"}, #d1d1d1 100%)`,
      width: "600px",
      height: "10px",
      borderRadius: "5px"
    };
    return (
      <div>
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
