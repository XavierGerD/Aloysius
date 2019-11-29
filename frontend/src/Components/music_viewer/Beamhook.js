import React from "react";

let Beamhook = props => {
  let id = Math.random() * 10000000;
  return <div className="beamHook" position="absolute" x={props.x} y={props.y} id={id} />;
};

export default Beamhook;
