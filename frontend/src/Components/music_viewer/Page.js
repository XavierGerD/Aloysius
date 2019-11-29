import React from "react";
import Bar from "./Bar.js";
import Clef from "./Clef.js";
import TimeSignature from "./TimeSignature.js";
import System from "./System.js";
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
  let staves = [];
  let bars = [];
  let ret = [];
  let notes = props.scoreContents.notes;
  let instrument = props.scoreContents.instrument;
  let staffConfig = (index, hand) => {
    let clef = determineClef(hand, instrument);

    return (
      <div className="staffConfig">
        <div className="barLineText">
          {instrument === "piano" && clef === "treble"
            ? <div className="startBarLineDiv" />
            : null}
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

  notes[0].forEach(() => {
    bars.push([]);
  });

  notes.forEach((barContents, j) => {
    barContents.forEach((arr, i) => {
      let clef = determineClef(i, instrument);

      if (j === 0 || (bars[i].length === 0 && j > 0)) {
        bars[i].push(staffConfig(j, i));
      }
      bars[i].push(
        <Bar
          {...props}
          arr={barContents[i]}
          clef={clef}
          length={notes.length}
          index={j}
          state={props}
          instrument={instrument}
          i={i}
        />
      );
      if (bars[i].length === props.maxBars) {
        staves.push(<System key={i} bars={bars[i]} />);
        bars[i] = [];
      }
      if (j === notes.length - 1 && bars[i].length !== 0) {
        staves.push(<System key={i} bars={bars[i]} />);
      }
      if (staves.length === notes[0].length) {
        ret.push(
          <div className="systemBox">
            {staves}
          </div>
        );
        staves = [];
      }
    });
  });

  return ret;
};

export default Page;
