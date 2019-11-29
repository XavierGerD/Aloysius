import React from "react";
import StaffLines from "./StaffLines.js";
import "./Staff.css";

let Staff = props => {
  return (
    <div className="system">
      <div className="staff">{<StaffLines />}</div>
      <div className="symbols">
        <div className="barContainer">{props.bars}</div>
      </div>
    </div>
  );
};

export default Staff;
