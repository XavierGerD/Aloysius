import { clefCodes } from "./UnicodeAssignment.js";
import React from "react";
import "./Clef.css";

let Clef = ({ clef, fontSize }) => {
  let style = { marginTop: clefCodes[clef].position * fontSize + "px" };
  return (
    <div className="clefText" style={style}>
      {clefCodes[clef].code}
    </div>
  );
};

export default Clef;
