import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      emailInput: "",
      codeInput: ""
    };
  }

  handleSubmit = async ev => {
    ev.preventDefault();
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
      window.alert("login success!");
      return this.props.dispatch({
        type: "signup-success",
        payload: parsed.row[0]
      });
    }
    window.alert("Signup failed!");
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
        <form onSubmit={this.handleSubmit}>
          Username
          <input type="text" onChange={this.handleUsernameChange} />
          Password
          <input type="text" onChange={this.handlePasswordChange} />
          Email
          <input type="text" onChange={this.handleEmailChange} />
          Classroom code (optional)
          <input type="text" onChange={this.handleClassroomChange} />
          <input type="submit" />
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
