import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Question from "./Question";
import * as serviceWorker from "./serviceWorker";
import "./style.css";

class Index extends Component {
  render = () => {
    return (
      <div className="main">
        <div className="boxType2" style={{ width: "1800px", height: "800px" }}>
          <div
            className="appBox"
            style={{
              width: "1600px",
              height: "800px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <App />
          </div>
          {/* <div className="appBox" style={{ width: "1600px", height: "80px" }}>
            <Question />
          </div> */}
        </div>
      </div>
    );
  };
}

ReactDOM.render(<Index />, document.getElementById("root"));

serviceWorker.unregister();
