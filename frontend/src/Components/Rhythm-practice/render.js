import { timeSignatureCodes } from "../UnicodeAssignment.js";

let getTimeSig = (e, sig, i) => {
  switch (e) {
    case 2:
      sig[i] = timeSignatureCodes.two;
      break;
    case 3:
      sig[i] = timeSignatureCodes.three;
      break;
    case 4:
      sig[i] = timeSignatureCodes.four;
      break;
    case 5:
      sig[i] = timeSignatureCodes.five;
      break;
    case 6:
      sig[i] = timeSignatureCodes.six;
      break;
    case 7:
      sig[i] = timeSignatureCodes.seven;
      break;
    default:
      return;
  }
};

export default getTimeSig;
