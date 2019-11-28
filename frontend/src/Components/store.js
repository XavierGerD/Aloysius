import { createStore } from "redux";
import { modules, users, articles } from "./Data.js";
import topics from "../Data/Users.js";
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
      return { ...state, currentBlock: action.payload };
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
    topics,
    currentBlock: [],
    currentTopic: undefined,
    loggedIn: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
