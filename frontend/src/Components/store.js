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
      newState.cardPositions = {};
      newState.dragDropValues = {};
      newState.answerSubmitted = false;
      newState.rightAnswer = false;
      return newState;

    case "topic":
      console.log("all blocks", action.payload);
      return { ...state, blocks: action.payload, currentTopic: action.topic };

    case "blocks":
      let currentBlock = action.payload;
      currentBlock.forEach((block, i) => {
        // console.log("block", block);
        if (block.heading === "score") {
          block.text = JSON.parse(block.text);
        }
      });
      // console.log("first block", currentBlock);
      return { ...state, currentBlock };

    case "update-block":
      let newBlock = R.clone(state.currentBlock);
      newBlock[1].text = action.payload;
      return { ...state, currentBlock: newBlock };

    case "start-exercise":
      return { ...state, currentBlockComplete: false };

    case "lesson-complete":
      return { ...state, currentBlockComplete: true };

    case "set-block-id":
      console.log("block ID", action.payload);
      return { ...state, currentBlockId: action.payload };

    case "dragdrop-values":
      let dragDropValues = R.clone(state.dragDropValues);
      dragDropValues[action.card] = action.value;
      // console.log("dragdrop values", dragDropValues);
      return { ...state, dragDropValues };

    case "card-positions":
      let cardPositions = R.clone(state.cardPositions);
      cardPositions[action.holder] = action.card;
      // console.log("current card positions:", cardPositions);
      return { ...state, cardPositions };

    case "remove-card":
      let newCardPositions = R.clone(state.cardPositions);
      let cardKeys = Object.keys(newCardPositions);
      cardKeys.forEach(cardPosition => {
        if (newCardPositions[cardPosition] === action.card) {
          newCardPositions[cardPosition] = undefined;
        }
      });
      console.log("new card positions", newCardPositions);
      return { ...state, cardPositions: newCardPositions };

    case "submit-answers":
      let isExerciseCompleted = true;
      let keys = Object.keys(state.cardPositions);
      keys.forEach((cardPosition, i) => {
        if (
          state.dragDropValues[state.cardPositions[cardPosition]] !==
          state.dragDropValues[cardPosition]
        ) {
          isExerciseCompleted = false;
        }
      });
      console.log("is exercise done?", isExerciseCompleted);
      if (isExerciseCompleted) {
        if (state.currentBlock[1].text.length === 1) {
          return { ...state, currentBlockComplete: true };
        }
        return {
          ...state,
          cardPositions: {},
          dragDropValues: {},
          answerSubmitted: true,
          rightAnswer: true
        };
      } else {
        return { ...state, answerSubmitted: true };
      }
    case "next-exercise":
      let newCurrentBlock = R.clone(state.currentBlock);
      console.log("old block!", newCurrentBlock[1].text);
      console.log("lessonID", action.lessonId);
      newCurrentBlock[1].text = newCurrentBlock[1].text.slice(
        action.lessonId,
        action.lessonId + 1
      );
      console.log("new block!", newCurrentBlock[1].text);
      return {
        ...state,
        currentBlock: newCurrentBlock,
        answerSubmitted: false,
        rightAnswer: false
      };
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
    currentTopic: undefined,
    loggedIn: false,
    permission: "user",
    currentBlockComplete: true,
    answerSubmitted: false,
    rightAnswer: false,
    cardPositions: {},
    dragDropValues: {}
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
