let mongoose = require("mongoose");
let topics = {
  rhythm: {
    title: "Rhythm",
    levels: [
      {
        title: "Level 1: Basics",
        id: "Rhythm1",
        modules: [[], []]
      },
      {
        title: "Level 2",
        modules: [[], []]
      }
    ]
  }
};

let topicSchema = new mongoose.Schema(
  {
    title: String,
    levels: Array
  },
  {
    collection: "topics"
  }
);

let levelSchema = new mongoose.Schema(
  {
    title: String,
    blocks: Array
  },
  {
    collection: "levels"
  }
);

let blockSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    thumbnail: String,
    content: Array
  },
  { collection: "blocks" }
);

let contentSchema = new mongoose.Schema(
  {
    // parent: String,
    heading: String,
    text: String
  },
  {
    collection: "content"
  }
);

module.exports.level = levelSchema;
module.exports.block = blockSchema;
module.exports.content = contentSchema;
module.exports.topic = topicSchema;
