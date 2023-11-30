const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/test", (req, res) => {
  res.send("App is online");
});

app.post("/upload-test", upload.single("book-img"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json("Upload Done !");
});

app.listen(4000, () => {
  console.log("Test is running on port 4000");
});
