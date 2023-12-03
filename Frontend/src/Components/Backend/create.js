const dom = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const path = require("path");
const fs = require("fs");
const xpath = require("xpath");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const filePath = path.join(__dirname, "Books.xml");

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

app.get("/test", (req, res) => {
  res.send("App is running !");
});

let filePath1 = "";
app.post("/upload", upload.single("file"), (req, res) => {
  filePath1 = `${req.file.destination}/${req.file.filename}`;
  filePath1 = req.file.filename;
  res.json(filePath1);
});

app.post("/add-item", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const author = req.body.author;
  const issueCost = req.body.cost;
  const genre = req.body.genre;
  const data = req.body.text;

  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");
  const root = select("/books", doc)[0];

  const bookTag = doc.createElement("book");
  const imageTag = doc.createElement("imgPath");
  const idTag = doc.createElement("id");
  const nameTag = doc.createElement("name");
  const authorTag = doc.createElement("author");
  const costTag = doc.createElement("issuecost");
  const genreTag = doc.createElement("genre");
  const textTag = doc.createElement("text");

  imageTag.textContent = filePath1 === "" ? "none" : filePath1;
  idTag.textContent = id;
  nameTag.textContent = name;
  authorTag.textContent = author;
  costTag.textContent = issueCost;
  genreTag.textContent = genre;
  textTag.textContent = data;

  bookTag.appendChild(imageTag);
  bookTag.appendChild(idTag);
  bookTag.appendChild(nameTag);
  bookTag.appendChild(authorTag);
  bookTag.appendChild(costTag);
  bookTag.appendChild(genreTag);
  bookTag.appendChild(textTag);

  doc.documentElement.appendChild(bookTag);
  const updatedXml = new XMLSerializer().serializeToString(doc);
  fs.writeFileSync(filePath, updatedXml);

  filePath1 = "";
  res.status(200).json("Book Added Successfully !");
});

app.listen(8081, () => {
  console.log("Create Service is Running on port 8081 !");
});
