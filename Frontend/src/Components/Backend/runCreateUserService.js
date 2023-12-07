const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => res.send("Working"));

app.get("/working", (req, res) => {
  console.log("This is the main app.");

  const childProcess = spawn("node", ["./createUserService.js"]);
  childProcess.stdout.on("data", (data) => {
    console.log(`Output from anotherFile: ${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    console.error(`Error from anotherFile: ${data}`);
  });

  childProcess.on("close", (code) => {
    console.log(`anotherFile process exited with code ${code}`);
  });
  res.json("ok");
});

app.listen(8087, () => {
  console.log("Server is running on port 8087");
});
