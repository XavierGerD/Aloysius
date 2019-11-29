import React from "react";
import "./Beam.css";
import { beamCodes } from "./UnicodeAssignment";

let Beam = ({ x1, x2, y, fontSize, code, className }) => {
  let style, beam;
  let deltaX = x2 - x1;

  let calculateSkewY = () => {
    return Math.atan(deltaX / y);
  };

  let calculateScaleX = () => {
    let fontRatio = fontSize / 3;
    return deltaX / fontRatio;
  };

  let scale = calculateScaleX(x1, x2);
  let skew = calculateSkewY(x1, y) * (180 / Math.PI);

  console.log("scale ", scale);
  console.log("skew ", skew);

  style = { transform: `scaleX(${scale}) skewY(${skew})` };

  if (code === "eighth") {
    beam = beamCodes.eighth;
  } else if (code === "sixteenth") {
    beam = beamCodes.sixteenth;
  }

  return (
    <div className={className} style={style}>
      {beam}
    </div>
  );
};

export default Beam;
