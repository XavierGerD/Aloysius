let express = require("express");
let app = express();
let multer = require("multer");
let cors = require("cors");

let connect = require("./database.js");

let upload = multer({
  dest: __dirname + "/uploads"
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.post("/post-topic", upload.none(), (req, res) => {
  connect.getTopics(req.body.topic, res);
});

app.post("/post-block", upload.none(), (req, res) => {
  connect.getBlock(req.body.id, res);
});

app.post("/login", upload.none(), (req, res) => {
  connect.login(req.body.username, req.body.password, res);
});

app.post("/signup", upload.none(), (req, res) => {
  connect.signup(
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.code,
    res
  );
});

app.post("/update-progress", upload.none(), (req, res) => {
  connect.updateProgress(req.body.username, req.body.blockID, res);
});

app.post("/post-course", upload.none(), (req, res) => {
  connect.getCourse(res);
});

app.use("/", express.static("build"));

app.listen("4000", () => {
  console.log("Server up");
});
