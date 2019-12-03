require("dotenv").config();
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
});

connection.connect(err => {
  if (err) {
    console.log("Connection error: ", err.stack);
    return;
  }
  console.log("Connected as thread id: ", connection.threadId);
});

let getCourse = res => {
  connection.query("SELECT * FROM topic", (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(JSON.stringify({ success: true, rows }));
  });
};

let getTopics = (topic, res) => {
  let sql =
    "SELECT * FROM (( topic INNER JOIN topic_blocks ON topic.topic_id = topic_blocks.topic_id) INNER JOIN block ON topic_blocks.block_id = block.block_id) WHERE topic.title LIKE ?";
  connection.query(sql, topic, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(JSON.stringify({ success: true, rows }));
  });
};

let getBlock = (id, res) => {
  let sql = `SELECT * FROM (content INNER JOIN block_contents ON content.content_id = block_contents.content_id) INNER JOIN block ON block_contents.content_id = block.block_id WHERE block_contents.block_id = ?
    UNION 
    SELECT * FROM (viewer_data INNER JOIN block_viewer_data ON viewer_data.content_id = block_viewer_data.viewer_content_id) INNER JOIN block ON block_viewer_data.viewer_content_id = block.block_id WHERE block_viewer_data.block_id = ?;`;
  let filter = [id, id];
  connection.query(sql, filter, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(JSON.stringify({ success: true, rows }));
  });
};

let login = (username, password, res) => {
  let sql = "SELECT * FROM users WHERE username LIKE ?";
  connection.query(sql, username, (err, row) => {
    if (err) throw err;
    if (row.length === 0) {
      return res.send(JSON.stringify({ success: false }));
    }
    if (row[0].password === password) {
      console.log("success!");
      return res.send(JSON.stringify({ success: true, row }));
    }
    console.log("failure :(");
    return res.send(JSON.stringify({ success: false }));
  });
};

let signup = (username, password, email, code, res) => {
  if (username.length === 0 || email.length === 0 || password.length === 0) {
    return res.send(JSON.stringify({ success: false }));
  }
  let sql = "SELECT * FROM users WHERE username like ? OR email LIKE ?";
  let filters = [username, email];
  connection.query(sql, filters, (err, row) => {
    if (err) throw err;
    if (row[0] === undefined) {
      if (code.length === 0) {
        code = 1;
      }
      let progress = "{}";
      sql =
        "INSERT INTO users (username, password, email, progress, classroom) VALUES (?, ?, ?, ?, ?)";
      filters = [username, password, email, progress, code];
      connection.query(sql, filters, (err, row) => {
        if (err) throw err;
        res.send(JSON.stringify({ success: true }));
      });
    } else {
      console.log(row[0]);
      if (username === row[0].username) {
        res.send(JSON.stringify({ success: false, username: true }));
      } else if (email === row[0].email) {
        res.send(JSON.stringify({ success: false, email: true }));
      }
    }
  });
};

let updateProgress = (username, blockID, res) => {
  let sql = "SELECT progress FROM users WHERE username LIKE ?";
  connection.query(sql, username, (err, row) => {
    if (err) throw err;
    let progress = JSON.parse(row[0].progress);
    if (progress[blockID] === undefined) {
      progress[blockID] = 1;
      progress = JSON.stringify(progress);
      let vars = [progress, username];
      let query = "UPDATE users SET progress = ? WHERE username = ?";
      connection.query(query, vars, (err, row) => {
        if (err) {
          console.log("Error! ", err);
          return res.send(JSON.stringify({ success: false }));
        }
        console.log("Success, row: ", row);
      });
      return res.send(JSON.stringify({ success: true, progress }));
    } else {
      progress[blockID] += 1;
      progress = JSON.stringify(progress);
      let vars = [progress, username];
      let query = "UPDATE users SET progress = ? WHERE username = ?";
      connection.query(query, vars, (err, row) => {
        if (err) {
          console.log("Error! ", err);
          return res.send(JSON.stringify({ success: false }));
        }
        console.log("Success, row: ", row);
      });
      return res.send(JSON.stringify({ success: true, progress }));
    }
  });
};

module.exports.getBlock = getBlock;
module.exports.getTopics = getTopics;
module.exports.login = login;
module.exports.updateProgress = updateProgress;
module.exports.getCourse = getCourse;
module.exports.signup = signup;
