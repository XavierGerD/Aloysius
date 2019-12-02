import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleThumb from "./ArticleThumb.jsx";
import "./Sidebar.css";

class UnconnectedSidebar extends Component {
  render = () => {
    return (
      <div className="sidebar">
        <div className="sidebarContainer">
          <div className="profile">
            <div className="profileName">
              {this.props.user.username}
            </div>
            {/* <div className="profilePic">
              <img src={this.props.users[0].profilePic} className="image" />
            </div> */}
          </div>
        </div>
        <div className="sidebarContainer">
          <div className="articlesHeader">Leaderboards</div>
        </div>
        <div className="sidebarContainer">
          <div className="articlesHeader">Scholarly articles</div>
          <div className="articles">
            <div className="articleList">
              {this.props.articles.map((article, i) => {
                let last = false;
                if (i === this.props.articles.length - 1) {
                  last = true;
                }
                return (
                  <ArticleThumb
                    thumbnail={article.thumbnail}
                    title={article.title}
                    last={last}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    articles: state.articles,
    user: state.user
  };
};

let Sidebar = connect(mapStateToProps)(UnconnectedSidebar);

export default Sidebar;
