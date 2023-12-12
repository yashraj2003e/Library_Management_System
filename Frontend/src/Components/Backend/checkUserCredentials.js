const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/getUser", (req, res) => {
  try {
    const fileName = "./data.txt";
    const filePath = path.join(__dirname, fileName);
    const username = req.body.username1;
    const password = req.body.password1;

    const content = `${username}\n${password}\n`;

    fs.writeFileSync(filePath, content);

    const childProcess = spawn("node", ["./getUserService.js"]);

    childProcess.stdout.on("data", (data) => {
      res.send(`${data}`[0]);
    });

    childProcess.stderr.on("data", (data) => {
      res.send(-1);
    });
  } catch (e) {
    res.send(-1);
  }
});

app.listen(8091, () => {
  console.log("Check User Credentials is running on port 8091 !");
});
