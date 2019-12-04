import { createStore } from "redux";
import { articles } from "./Data.js";
// import topics from "../Data/Users.js";
import * as R from "ramda";

let reducer = (state, action) => {
  switch (action.type) {
    case "login-success":
      return { ...state, user: action.payload, loggedIn: true };
    case "lessonComplete":
      let newState = R.clone(state);
      newState.currentBlock = [];
      newState.user.progress = action.payload;
      newState.currentBlockComplete = false;
      return newState;
    case "topic":
      console.log("all blocks", action.payload);
      return { ...state, blocks: action.payload, currentTopic: action.topic };
    case "blocks":
      // console.log("lesson:", action.payload);
      let currentBlock = action.payload;
      currentBlock[1].text = JSON.parse(currentBlock[1].text);
      // console.log("parsed lesson:", currentBlock);
      return { ...state, currentBlock };
    case "update-block":
      // console.log("payload", action.payload);
      let newBlock = R.clone(state.currentBlock);
      newBlock[1].text = action.payload;
      return { ...state, currentBlock: newBlock };
    case "exerciseComplete":
      return { ...state, currentBlockComplete: true };
    case "total-answers":
      let expectedAnswers = state.expectedAnswers.concat([action.payload]);
      console.log("expected answers:", expectedAnswers);
      return { ...state, expectedAnswers };
    case "add-answer":
      let expectedAnswersCopy = R.clone(state.expectedAnswers);
      console.log("expected answers", expectedAnswersCopy);
      expectedAnswersCopy.forEach((answer, i) => {
        console.log("answer", answer);
        console.log("payload", action.expectedAnswer);
        if (
          answer.type === action.expectedAnswer &&
          answer.position === action.position &&
          answer.barNumber === action.barNumber
        ) {
          return (answer.rightAnswer = !answer.rightAnswer);
        }
      });
      return { ...state, expectedAnswers: expectedAnswersCopy };
    case "submit-answers":
      let isExerciseCompleted = true;
      state.expectedAnswers.forEach(answer => {
        if (!answer.rightAnswer) {
          isExerciseCompleted = false;
        }
      });
      if (isExerciseCompleted) {
        console.log("lesson complete");
        return {
          ...state,
          answerInput: [],
          expectedAnswers: []
        };
      } else return { ...state };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  {
    blocks: [],
    user: {},
    articles,
    currentBlock: [],
    currentBlockComplete: false,
    currentTopic: undefined,
    loggedIn: false,
    permission: "user",
    answerInput: [],
    expectedAnswers: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
