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

app.patch("/update-item", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const author = req.body.author;
  const issueCost = req.body.cost;
  const data = req.body.text;

  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");
  const root = select(`/books/book[id=${id}]`, doc);

  if (root[0].childNodes.length > 7) {
    root[0].childNodes[3].textContent = name;
    root[0].childNodes[5].textContent = author;
    root[0].childNodes[7].textContent = issueCost;
    root[0].childNodes[9].textContent = data;
    console.log(1);
  } else {
    root[0].childNodes[1].textContent = name;
    root[0].childNodes[2].textContent = author;
    root[0].childNodes[3].textContent = issueCost;
    root[0].childNodes[4].textContent = data;
  }

  const updatedXml = new XMLSerializer().serializeToString(doc);
  fs.writeFileSync(filePath, updatedXml);

  res.status(200).json("Book Updated Successfully !");
});

app.listen(8083, () => {
  console.log("Update Service is Running on port 8083 !");
});
