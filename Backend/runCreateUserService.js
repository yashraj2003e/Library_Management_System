const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => res.send("Working"));

// app.js

// Capture the output of the child process
app.get("/working", (req, res) => {
  console.log("This is the main app.");

  // Run another file as a separate process
  const childProcess = spawn("node", ["./createUserService.js"]);
  childProcess.stdout.on("data", (data) => {
    console.log(`Output from anotherFile: ${data}`);
  });

  // Capture any errors that might occur in the child process
  childProcess.stderr.on("data", (data) => {
    console.error(`Error from anotherFile: ${data}`);
  });

  // Handle the exit event of the child process
  childProcess.on("close", (code) => {
    console.log(`anotherFile process exited with code ${code}`);
  });
  res.json("ok");
});

app.listen(8087, () => {
  console.log("Server is running on port 8087");
});
