import React, { Component } from "react";
import { uuid } from "uuidv4";
import { articles, lessons } from "./Components/Data.js";
import SkillTree from "./Components/SkillTree.jsx";
import NavBar from "./Components/NavBar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Lesson from "./Components/Lesson.jsx";
import Selector from "./Components/Selector.jsx";
import Signup from "./Components/Signup.jsx";
import LoginSelector from "./Components/LoginSelector.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import RhythmPractice from "./Components/Rhytmes/RhythmPractice.jsx";
import Login from "./Components/Login.jsx";
import { connect } from "react-redux";

class UnconnectedApp extends Component {
  renderArticle = routerData => {
    let lessonId = routerData.match.params.id;
    return <Lesson id={lessonId} />;
  };

  renderHome = () => {
    return (
      <div>
        <div className="homePage">
          <div className="bgImage">
            <div className="gradient" />
            <img src="/homepagebg.png" className="homeImage" />
          </div>
          <div className="welcomeContainer">
            <div className="welcomeTextHolder">
              <div className="welcomeText">MUSIC EDUCATION </div>{" "}
              <div className="welcomeText">STARTS HERE</div>
            </div>
            <div className="getStartedHolder">
              <Link to="/signup">
                <div className="homePageButton">Get started!</div>
              </Link>
              <Link to="/login">
                <div className="homePageButton">Already have an account?</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="homePageSection">
          <div>
            <div>
              <h1>What is Aloysius?</h1>
            </div>
            <div className="homePageBlurb">
              Learning music theory and practicing your instrument has never
              been so much fun! Using the latest web technologies, Aloysius
              allows you to follow an in-depth, rewarding program that will take
              you from newbie to pro in a matter of weeks - totally free!
            </div>
          </div>
          <div className="homePagePictureContainer">
            <img src="/rhythmpractice.png" className="homePageImage" />
          </div>
        </div>
        <div className="homePageSpacer" />
        <div className="homePageSection">
          <div className="homePagePictureContainer">
            <img src="/musky.jpg" />
          </div>
          <div>
            <div>
              <h1>How does it work?</h1>
            </div>
            <div className="homePageBlurb">
              Create an account and start learning! It's as easy as that!
              Progressive exercises will allow you to build solid knowledge of
              music theory. Just read the lessons and complete the exercises.
              You can always come back to earlier exercises and continue
              practicing.
            </div>
          </div>
        </div>
        <div className="homePageSpacer" />
        <div className="homePageSection">
          <div>
            <div>
              <h1>Tools for teachers</h1>
            </div>
            <div className="homePageBlurb">
              Are you a music educator? Use our platform to create a custom
              cursus! Our simple drag-and-drop mechanics allow you to
              personalize our skill tree at the click of a button. Edit lessons,
              create your own exercises - tailor our platform to your needs and
              those of your students. Click here for more information.
            </div>
          </div>
          <div className="homePagePictureContainer">
            <img src="/musky.jpg" />
          </div>
        </div>
      </div>
    );
  };

  renderSkillTree = routerData => {
    if (!this.props.loggedIn) {
      return <LoginSelector />;
    }
    let topic = routerData.match.params.topic;
    return (
      <React.Fragment>
        <SkillTree topic={topic} />
        <Sidebar />
      </React.Fragment>
    );
  };
  renderPractice = () => {
    return (
      <React.Fragment>
        <RhythmPractice />
      </React.Fragment>
    );
  };

  renderSelector = () => {
    if (!this.props.loggedIn) {
      return <LoginSelector />;
    }
    return <Selector />;
  };

  renderLogin = () => {
    return <LoginSelector />;
  };

  render = () => {
    return (
      <div>
        <BrowserRouter>
          <Route exact={false} path="/" component={NavBar} />
          <div className="container">
            <Route exact={true} path="/" render={this.renderHome} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/signup" component={Signup} />
            <Route
              exact={true}
              path="/skilltree/:topic"
              render={this.renderSkillTree}
            />
            <Route exact={true} path="/selector" render={this.renderSelector} />
            <Route
              exact={true}
              path="/lesson/:id"
              render={this.renderArticle}
            />
            <Route exact={true} path="/practice" render={this.renderPractice} />
          </div>
        </BrowserRouter>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
