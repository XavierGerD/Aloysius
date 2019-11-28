import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";

class UnconnectedNavBar extends Component {
  render = () => {
    return (
      <div className="navBar">
        <div className="navItems2">
          <Link to="/" style={{ textDecoration: "inherit" }}>
            <div className="logo">ALOYSIUS</div>
          </Link>
          <div className="preferences">
            <div className="currentModule">MODULE</div>
            <div className="preferences">PREFERENCES</div>
          </div>
        </div>
        <div className="navItems">
          <div className="navBarItem">
            LEARN
            <div className="hitbox" />
            <div className="innerNavBar">
              <Link to="/selector" style={{ textDecoration: "inherit" }}>
                <div className="navBarSubItem">LESSONS</div>
              </Link>
              <div className="separator" />
              <Link to="/practice" style={{ textDecoration: "inherit" }}>
                <div className="navBarSubItem">PRACTICE</div>
              </Link>
            </div>
          </div>
          <div className="navBarItem">
            COMMUNITY
            <div className="hitbox" />
            <div className="innerNavBar">
              <div className="navBarSubItem">FORUM</div>
              <div className="separator" />
              <div className="navBarSubItem">ARTICLES</div>
            </div>
            <div className="innerNavBar" />
          </div>
          <div className="navBarItem">
            STORE
            <div className="innerNavBar" />
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    name: state.username,
    score: state.totalScore
  };
};

let NavBar = connect(mapStateToProps)(UnconnectedNavBar);

export default NavBar;
