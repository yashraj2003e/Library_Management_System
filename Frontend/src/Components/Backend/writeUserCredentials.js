const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/updateCreds", (req, res) => {
  try {
    const fileName = "./data.txt";
    const filePath = path.join(__dirname, fileName);
    const username = req.body.username1;
    const password = req.body.password1;

    const content = `${username}\n${password}\n`;

    fs.writeFileSync(filePath, content);
    res.send(`1`);
  } catch (e) {
    res.send(`0`);
  }
});

app.listen(8090, () => {
  console.log("Update Credentials Service is running on port 8090");
});
