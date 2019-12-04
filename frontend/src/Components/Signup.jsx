import React, { Component } from "react";
import { connect } from "react-redux";
import "./signup.css";

class UnconnectedSignup extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      emailInput: "",
      codeInput: "",
      usernameInUse: false,
      emailInUse: false
    };
  }

  handleSubmit = async ev => {
    ev.preventDefault();
    this.setState({ usernameInUse: false });
    this.setState({ emailInUse: false });
    let data = new FormData();
    data.append("username", this.state.usernameInput);
    data.append("password", this.state.passwordInput);
    data.append("email", this.state.emailInput);
    data.append("code", this.state.codeInput);
    let response = await fetch("/signup", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      return this.props.dispatch({
        type: "signup-success",
        payload: parsed.row[0]
      });
    }
    if (!parsed.success && parsed.username) {
      this.setState({ usernameInUse: true });
    }
    if (!parsed.success && parsed.email) {
      this.setState({ emailInUse: true });
    }
  };

  handleUsernameChange = event => {
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ passwordInput: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ emailInput: event.target.value });
  };

  handleClassroomChange = event => {
    this.setState({ codeInput: event.target.value });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signupBox">
          Please create an account!
          <input
            type="text"
            onChange={this.handleUsernameChange}
            className="inputBox"
            placeholder="Username"
            required
          />
          {this.state.usernameInUse
            ? <div className="wrongPassword">Username already in use!</div>
            : null}
          <input
            type="password"
            onChange={this.handleEmailChange}
            className="inputBox"
            placeholder="Email"
            required
          />
          {this.state.emailInUse
            ? <div className="wrongPassword">Email already in use!</div>
            : null}
          <input
            type="text"
            onChange={this.handlePasswordChange}
            className="inputBox"
            placeholder="Password"
            required
          />
          <input
            type="text"
            onChange={this.handleClassroomChange}
            className="inputBox"
            placeholder="Classroom code (optional)"
          />
          <div className="smallText">
            If you don't have a classroom code, leave this field blank
          </div>
          <input type="submit" className="submitButton" />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    user: state.user
  };
};

let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
