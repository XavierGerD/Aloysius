import React, { Component } from "react";
import Block from "./Block.jsx";
import { connect } from "react-redux";
import "./skilltree.css";

class UnconnectedSkillTree extends Component {
  componentDidMount = async () => {
    let topic = this.props.topic;
    let data = new FormData();
    data.append("topic", topic);
    let response = await fetch("/post-topic", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("receiving rows", parsed);
    if (parsed.success) {
      this.props.dispatch({ type: "topic", payload: parsed.rows, topic });
    }
  };

  getProgress = id => {
    console.log("progress: ", this.props.user.progress);
    let progress = JSON.parse(this.props.user.progress);
    if (progress[id] !== undefined) {
      return progress[id];
    } else {
      return null;
    }
  };

  createSubdivisions = blocks => {
    let ret = {};
    blocks.forEach((block, i) => {
      if (!ret[block.subdivision]) ret[block.subdivision] = [];
      ret[block.subdivision] = ret[block.subdivision].concat(block);
    });

    let keys = Object.keys(ret);
    ret = keys.map(array => {
      return ret[array];
    });
    console.log("return", ret);
    return ret;
  };

  render = () => {
    let blocks = this.createSubdivisions(this.props.blocks);
    console.log("new blocks array", blocks);
    if (blocks.length > 0) {
      return (
        <div className="skilltree">
          {blocks.map(subdivision => {
            return (
              <div className="level">
                {subdivision.map(block => {
                  return (
                    <div>
                      <div className="moduleDiv">
                        <Block
                          topic={this.props.topic}
                          type={block.type}
                          image={block.thumbnail}
                          name={block.title}
                          subdivision={block.subdivision}
                          progress={this.getProgress(block.block_id)}
                          maxProgress={block.maxProgress}
                          id={block.block_id}
                        />
                        <div className="spacer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };
}

let mapStateToProps = state => {
  return {
    blocks: state.blocks,
    topics: state.topics,
    user: state.user
  };
};

let SkillTree = connect(mapStateToProps)(UnconnectedSkillTree);

export default SkillTree;
