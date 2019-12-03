import { createStore } from "redux";
import { modules, users, articles } from "./Data.js";
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
      return newState;
    case "topic":
      console.log("all blocks", action.payload);
      return { ...state, blocks: action.payload, currentTopic: action.topic };
    case "blocks":
      console.log("lesson:", action.payload);
      let currentBlock = action.payload;
      currentBlock[1].text = JSON.parse(currentBlock[1].text);
      console.log("parsed lesson:", currentBlock);
      return { ...state, currentBlock };
    case "update-block":
      console.log("payload", action.payload);
      let newBlock = R.clone(state.currentBlock);
      newBlock[1].text = action.payload;
      return { ...state, currentBlock: newBlock };
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
    loggedIn: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
