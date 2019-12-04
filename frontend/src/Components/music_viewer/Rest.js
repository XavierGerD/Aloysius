import React, { Component } from "react";
import { restCodes } from "./UnicodeAssignment.js";
import { uuid } from "uuidv4";

class Rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beatNumber: this.props.beatNumber
    };
  }
  render = () => {
    let style = {
      height: this.props.fontSize,
      width: this.props.fontSize / 3,
      marginTop: this.props.fontSize / -1 + "px",
      paddingTop: this.props.fontSize / 2
    };

    return (
      <div className="noteHead" style={style} key={uuid()}>
        {restCodes[this.props.code]}
      </div>
    );
  };
}

export default Rest;
