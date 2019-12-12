import { createStore } from "redux";
import { articles } from "./Data.js";
// import topics from "../Data/Users.js";
import * as R from "ramda";

let reducer = (state, action) => {
  switch (action.type) {
    case "login-success":
      return { ...state, user: action.payload, loggedIn: true };

    case "lesson-complete":
      let newState = R.clone(state);
      newState.currentBlock = [];
      newState.currentBlockComplete = false;
      newState.cardPositions = {};
      newState.dragDropValues = {};
      newState.answerSubmitted = false;
      newState.rightAnswer = false;
      newState.missingNoteCards = [];
      newState.currentProgress = 0;
      newState.maxProgress = 0;
      newState.currentBlockType = undefined;
      if (action.payload !== undefined) {
        newState.user.progress = action.payload;
      }
      console.log("new state!", newState);
      return newState;

    case "topic":
      console.log("all blocks", action.payload);
      return { ...state, blocks: action.payload, currentTopic: action.topic };

    case "blocks":
      let currentBlock = action.payload;
      let maxProgress;
      let currentBlockType = currentBlock[0].type;
      currentBlock.forEach((block, i) => {
        // console.log("block", block);
        if (block.heading === "score") {
          block.text = JSON.parse(block.text);
          maxProgress = block.text.length;
        }
      });

      // console.log("first block", currentBlock);
      return { ...state, currentBlock, maxProgress, currentBlockType };

    case "update-block":
      let newBlock = R.clone(state.currentBlock);
      newBlock[1].text = action.payload;
      return { ...state, currentBlock: newBlock };

    case "start-exercise":
      return { ...state, currentBlockComplete: false };

    case "complete-block":
      return { ...state, currentBlockComplete: true };

    case "set-block-id":
      console.log("block ID", action.payload);
      return { ...state, currentBlockId: action.payload };

    case "missing-note":
      let missingNoteCards = [...state.missingNoteCards];
      missingNoteCards = missingNoteCards.concat([action.payload]);
      // console.log("missing note cards", missingNoteCards);
      return { ...state, missingNoteCards };

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
      if (isExerciseCompleted && !state.answerSubmitted) {
        let currentProgress = (state.currentProgress += 1);
        if (state.currentBlock[1].text.length === 1) {
          return {
            ...state,
            currentBlockComplete: true,
            currentProgress,
            missingNoteCards: []
          };
        }

        return {
          ...state,
          cardPositions: {},
          dragDropValues: {},
          answerSubmitted: true,
          rightAnswer: true,
          currentProgress
        };
      } else {
        return { ...state, answerSubmitted: true };
      }
    case "next-exercise":
      let newCurrentBlock = R.clone(state.currentBlock);
      console.log("old block!", newCurrentBlock[1].text);
      console.log("lessonID", action.lessonId);
      newCurrentBlock[1].text.splice(action.lessonId, 1);
      console.log("new block!", newCurrentBlock[1].text);
      return {
        ...state,
        currentBlock: newCurrentBlock,
        answerSubmitted: false,
        rightAnswer: false,
        missingNoteCards: []
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
    currentBlockType: undefined,
    currentBlockComplete: false,
    answerSubmitted: false,
    rightAnswer: false,
    cardPositions: {},
    dragDropValues: {},
    missingNoteCards: [],
    currentProgress: 0,
    maxProgress: 0
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
