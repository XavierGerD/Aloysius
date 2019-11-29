import React, { Component } from "react";
import {uuid} from "uuidv4"
import { articles, lessons } from "./Components/Data.js";
import SkillTree from "./Components/SkillTree.jsx";
import NavBar from "./Components/NavBar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Lesson from "./Components/Lesson.jsx"
import Selector from "./Components/Selector.jsx"
import Signup from "./Components/Signup.jsx"
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import RhythmPractice from "./Components/Rhytmes/RhythmPractice.jsx";
import Login from "./Components/Login.jsx"
import { connect } from "react-redux"

class UnconnectedApp extends Component {
  renderArticle = routerData => {
    let lessonId = routerData.match.params.id
    return <Lesson id={lessonId}/>
  };

  renderHome = () => {
    return <div>WELCOME TO ALYSIUS!</div>
  }

  renderSkillTree = (routerData) => {
    if (!this.props.loggedIn) {
      return <div>Please log in!<Login/></div>
    }
    let topic = routerData.match.params.topic
    return (
      <>
        <SkillTree topic={topic}  />
        <Sidebar />
      </>
    );
  };
  renderPractice = () => {
    return(
      <>
        <RhythmPractice />
      </>
    )
  }

  renderSelector = () => {
    if (!this.props.loggedIn) {
      return <div>Please log in!<Login/></div>
    }
    return (<Selector />)
  }

  renderLogin = () =>{

    return <Login/>
  }

  render = () => {
    return (
      <div>
       
        <BrowserRouter>
        
        <Route exact={false} path="/" component={NavBar}/>
          <div className="container">
          <Route exact={true} path="/" render={this.renderHome}/>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/signup" component={Signup} />
            <Route exact={true} path="/skilltree/:topic" render={this.renderSkillTree} />

            <Route exact={true} path="/selector" render={this.renderSelector} />
            
            <Route exact={true} path="/lesson/:id" render={this.renderArticle} />

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
  }
}

let App = connect(mapStateToProps)(UnconnectedApp)

export default App;
