const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => res.send("Working"));

app.get("/createUser", (req, res) => {
  const childProcess = spawn("node", ["./createUserService.js"]);
  childProcess.stdout.on("data", (data) => {
    res.send(`${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    res.send(-1);
  });
});

app.listen(8087, () => {
  console.log("Server is running on port 8087");
});
