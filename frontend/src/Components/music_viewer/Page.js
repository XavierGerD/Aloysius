import React from "react";
import { uuid } from "uuidv4";

import Bar from "./Bar.js";
import Clef from "./Clef.js";
import TimeSignature from "./TimeSignature.js";
import Staff from "./Staff.js";
import { barlines } from "./UnicodeAssignment.js";
import { KeySignature } from "./KeySignature.js";
import "./Page.css";

let determineClef = (hand, instrument) => {
  let clef;
  if (instrument === "piano") {
    if (hand === 0) {
      clef = "treble";
    } else {
      clef = "bass";
    }
  } else {
    clef = instrument;
  }
  return clef;
};

let Page = props => {
  let renderedSystem = [];
  let system = [];
  let renderedScore = [];
  let score = props.scoreContents.notes;
  let instrument = props.scoreContents.instrument;
  let staffConfig = (index, hand) => {
    let clef = determineClef(hand, instrument);

    return (
      <div key={uuid()} className="staffConfig">
        <div className="barLineText">
          {instrument === "piano" && clef === "treble" ? (
            <div className="startBarLineDiv" />
          ) : null}
          {/* {instrument === "piano" && clef === "treble" ? <div className="startBarLineDiv" /> : null} {} */}
        </div>
        {<Clef clef={clef} fontSize={props.fontSize} />}
        {
          <KeySignature
            signature={props.keySignature}
            clef={clef}
            fontSize={props.fontSize}
          />
        }
        {index === 0 ? <TimeSignature signature={props.timeSignature} /> : null}
      </div>
    );
  };

  console.log("SCORE:", score);
  score[0].forEach(() => {
    system.push([]);
  });

  score.forEach((bar, j) => {
    bar.forEach((hand, i) => {
      let clef = determineClef(i, instrument);

      if (j === 0 || (system[i].length === 0 && j > 0)) {
        system[i].push(staffConfig(j, i));
      }
      system[i].push(
        <Bar
          key={uuid()}
          {...props}
          hand={bar[i]}
          clef={clef}
          length={score.length}
          index={j}
          instrument={instrument}
          i={i}
        />
      );

      // have we filled a system?
      if (system[i].length === props.maxBarsPerSystem) {
        renderedSystem.push(<Staff key={uuid()} bars={system[i]} />);
        system[i] = [];
      }

      if (j === score.length - 1 && system[i].length !== 0) {
        renderedSystem.push(<Staff key={uuid()} bars={system[i]} />);
      }
      if (renderedSystem.length === score[0].length) {
        renderedScore.push(
          <div key={uuid()} className="systemBox">
            {renderedSystem}
          </div>
        );
        renderedSystem = [];
      }
    });
  });
  console.log("RETURNED SCORE:", renderedScore);
  return renderedScore;
};

export default Page;
