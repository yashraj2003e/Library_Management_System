const dom = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const path = require("path");
const fs = require("fs");
const xpath = require("xpath");
const express = require("express");

const filePath = path.join(__dirname, "Books.xml");

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("App is running !");
});

app.post("/add-item", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const author = req.body.author;
  const issueCost = req.body.cost;
  const data = req.body.text;

  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");
  const root = select("/books", doc)[0];

  const bookTag = doc.createElement("book");
  const idTag = doc.createElement("id");
  const nameTag = doc.createElement("name");
  const authorTag = doc.createElement("author");
  const costTag = doc.createElement("issuecost");
  const textTag = doc.createElement("text");

  idTag.textContent = id;
  nameTag.textContent = name;
  authorTag.textContent = author;
  costTag.textContent = issueCost;
  textTag.textContent = data;

  bookTag.appendChild(idTag);
  bookTag.appendChild(nameTag);
  bookTag.appendChild(authorTag);
  bookTag.appendChild(costTag);
  bookTag.appendChild(textTag);

  doc.documentElement.appendChild(bookTag);
  const updatedXml = new XMLSerializer().serializeToString(doc);
  fs.writeFileSync(filePath, updatedXml);

  res.status(200).json("Book Added Successfully !");
});

app.listen(8081, () => {
  console.log("Create Service is Running on port 8081 !");
});
