import React, { Component } from "react";
import "./ArticleThumb.css";

class ArticleThumb extends Component {
  render = () => {
    let article = "article";
    if (this.props.last === true) {
      article = "lastArticle";
    }
    return (
      <div className={article}>
        <div className="thumbnail">
          <img src={"/" + this.props.thumbnail} className="image" alt="" />
        </div>
        <div className="title">
          {this.props.title}
        </div>
      </div>
    );
  };
}

export default ArticleThumb;
