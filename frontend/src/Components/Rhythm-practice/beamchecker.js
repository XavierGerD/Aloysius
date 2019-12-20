import React from "react";
import {
  completeNotes,
  beamCodes,
  flagCodes,
  restCodes
} from "../UnicodeAssignment.js";

//Checks to see which beams for the first note
let checkFirst = (i, e) => {
  if (i[0] === 1 && i[1] === 1) {
    e.push(
      <div className="rp-note">
        {completeNotes.beamless}
        <div className="rp-eighthbeam">
          {beamCodes.eighth}
        </div>
      </div>
    );
  } else if (i[0] === 1 && i[1] === 0) {
    e.push(
      <div className="rp-note">
        {completeNotes.beamless}

        <div className="rp-eighthflag">
          {flagCodes.eighth.up}
        </div>
      </div>
    );
  } else if (i[0] === 0) {
    e.push(
      <div className="rp-rest">
        {restCodes.eighth}
      </div>
    );
  }
};

//Checks to see which beam for any middle note
let checkMid = (i, e, d) => {
  if (i[1 + d] === 1 && i[0 + d] === 1 && i[2 + d] === 1) {
    e.push(
      <div className="rp-note">
        {completeNotes.eighthBeam}
        <div className="rp-eighthbeam">
          {beamCodes.eighth}
        </div>
      </div>
    );
  } else if (i[1 + d] === 1 && i[0 + d] === 0 && i[2 + d] === 1) {
    e.push(
      <div className="rp-note">
        {completeNotes.beamless}
        <div className="rp-eighthbeam">
          {beamCodes.eighth}
        </div>
      </div>
    );
  } else if (i[1 + d] === 1 && i[0 + d] === 1 && i[2 + d] === 0) {
    e.push(
      <div className="rp-note">
        {completeNotes.eighthBeam}
      </div>
    );
  } else if (i[1 + d] === 1 && i[0 + d] === 0 && i[2 + d] === 0) {
    e.push(
      <div className="rp-note">
        {completeNotes.beamless}

        <div className="rp-eighthflag">
          {flagCodes.eighth.up}
        </div>
      </div>
    );
  } else if (i[1 + d] === 0) {
    e.push(
      <div className="rp-rest">
        {restCodes.eighth}
      </div>
    );
  }
};

//Checks to see which beam for last note
let checkLast = (i, e) => {
  if (i[i.length - 1] === 1 && i[i.length - 2] === 1) {
    e.push(
      <div className="rp-note">
        {completeNotes.eighthBeam}
      </div>
    );
  } else if (i[i.length - 1] === 1 && i[i.length - 2] === 0) {
    e.push(
      <div className="rp-note">
        {completeNotes.beamless}
        <div className="rp-eighthflag">
          {flagCodes.eighth.up}
        </div>
      </div>
    );
  } else if (i[i.length - 1] === 0) {
    e.push(
      <div className="rp-rest">
        {restCodes.eighth}
      </div>
    );
  }
};

// render beamless black notes
let renderBeamless = (i, e) => {
  i.forEach(note => {
    if (note === 1) {
      e.push(
        <div className="rp-note">
          {completeNotes.beamless}
          <div className="rp-spacer" />
        </div>
      );
    }
    if (note === 0) {
      e.push(
        <div className="rp-rest">
          {restCodes.quarter}
        </div>
      );
    }
  });
};

export { checkFirst, checkLast, checkMid, renderBeamless };
