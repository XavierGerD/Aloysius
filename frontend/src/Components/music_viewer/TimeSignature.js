import { timeSignatureCodes } from "./UnicodeAssignment.js";
import React from "react";
import "./TimeSignature.css";

let TimeSignature = ({ signature }) => {
  let top = timeSignatureCodes[signature[0]];
  let bottom = timeSignatureCodes[signature[1]];
  return (
    <div className="timeSignatureBox">
      <div className="timeSignatureTextTop">
        {top}
      </div>
      <div className="timeSignatureTextBottom">
        {bottom}
      </div>
    </div>
  );
};

export default TimeSignature;
