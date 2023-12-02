const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
const app = express();

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("App is online");
});

app.post("/upload", upload.single("book"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // res.json("Upload Done !");
});

app.listen(4000, () => {
  console.log("Test is running on port 4000");
});
