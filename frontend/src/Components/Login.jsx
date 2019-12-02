import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: ""
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
      window.alert("login success!");
      return this.props.dispatch({
        type: "login-success",
        payload: parsed.row[0]
      });
    }
    window.alert("Login failed!");
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
        <form onSubmit={this.handleSubmit}>
          Username
          <input type="text" onChange={this.handleUsernameChange} />
          Password
          <input type="text" onChange={this.handlePasswordChange} />
          <input type="submit" />
        </form>
        Don't have an account?
        <Link to="/signup"> Sign up here</Link>.
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
