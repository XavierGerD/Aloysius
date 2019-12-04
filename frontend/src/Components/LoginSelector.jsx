import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./loginSelector.css";

class LoginSelector extends Component {
  constructor() {
    super();
    this.state = {
      loginToggle: true
    };
  }

  loginChangeHandler = () => {
    console.log("handler hit");
    this.setState({ loginToggle: !this.state.loginToggle });
  };

  render = () => {
    return (
      <div className="loginSelector">
        <div className="tabContainer">
          <label
            className="tabSelector"
            style={{
              backgroundColor: !this.state.loginToggle ? "#d1d1d1" : "white"
            }}
          >
            Login
            <input
              type="radio"
              name="connect"
              id=""
              className="radio1"
              onChange={this.loginChangeHandler}
              checked={this.state.loginToggle}
            />
          </label>
          <label
            className="tabSelector"
            style={{
              backgroundColor: this.state.loginToggle ? "#d1d1d1" : "white"
            }}
          >
            Signup
            <input
              type="radio"
              name="connect"
              className="radio1"
              onChange={this.loginChangeHandler}
              checked={!this.state.loginToggle}
            />
          </label>
        </div>
        <div className="componentHolder">
          {this.state.loginToggle ? <Login /> : <Signup />}
        </div>
      </div>
    );
  };
}

export default LoginSelector;
