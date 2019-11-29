import React from "react";
import Staff from "./Staff.js";
import "./System.css";

let System = props => {
  return (
    <div className="system">
      <div className="staff">
        {<Staff />}
      </div>
      <div className="symbols">
        <div className="barContainer">
          {props.bars}
        </div>
      </div>
    </div>
  );
};

export default System;
