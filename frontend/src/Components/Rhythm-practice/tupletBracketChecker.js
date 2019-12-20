import React from "react";
import { tupletBracketCodes, tupletCodes } from "../UnicodeAssignment.js";

let tupletChecker = i => {
  console.log("size", i);
  switch (i) {
    case 2:
      return tupletCodes.two;
    case 3:
      return tupletCodes.three;
    case 4:
      return tupletCodes.four;
    case 5:
      return tupletCodes.five;
    case 6:
      return tupletCodes.six;
    case 7:
      return tupletCodes.seven;
  }
};

let fillInTuplets = size => {
  let tupletBrackets = [];
  tupletBrackets.push(
    <div>
      {tupletBracketCodes.left}
    </div>
  );
  tupletBrackets.push(
    <div className="rp-tupletvalue">
      {tupletChecker(size)}
    </div>
  );
  tupletBrackets.push(
    <div>
      {tupletBracketCodes.right}
    </div>
  );
  return tupletBrackets;
};

export { fillInTuplets };
