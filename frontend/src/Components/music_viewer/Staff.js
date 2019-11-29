import React from "react";
import { staffSegment } from "./UnicodeAssignment.js";
import "./Staff.css";

let Staff = () => {
  return (
    <div className="systemStaff">
      {staffSegment}
    </div>
  );
};

export default Staff;
