import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./login.css";

class UnconnectedLogin extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      loginFailed: false
    };
  }

  handleSubmit = async ev => {
    ev.preventDefault();
    let data = new FormData();
    data.append("username", this.state.usernameInput);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/login", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      return this.props.dispatch({
        type: "login-success",
        payload: parsed.row[0]
      });
    }
    this.setState({ loginFailed: true });
  };

  handleUsernameChange = event => {
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ passwordInput: event.target.value });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="loginBox">
          Please log in!
          <input
            type="text"
            onChange={this.handleUsernameChange}
            className="inputBox"
            placeholder="Username"
            required
          />
          <input
            type="password"
            onChange={this.handlePasswordChange}
            className="inputBox"
            placeholder="Password"
            required
          />
          {this.state.loginFailed
            ? <div className="wrongPassword">Wrong username or password</div>
            : null}
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

let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;
