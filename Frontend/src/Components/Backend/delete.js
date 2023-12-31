const dom = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const path = require("path");
const fs = require("fs");
const xpath = require("xpath");
const express = require("express");
const cors = require("cors");

const filePath = path.join(__dirname, "./Books.xml");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("App is running !");
});

app.delete("/delete-item", (req, res) => {
  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");

  const id = req.body.id;
  console.log(id);
  let result1 = select(`/books/book[id=${id}]`, doc);
  console.log(result1.textContent);
  if (result1.length === 0) {
    res.json("Empty");
    console.log(1);
  } else {
    result1[0].parentNode.removeChild(result1[0]);
    const updatedXml = new XMLSerializer().serializeToString(doc);
    fs.writeFileSync(filePath, updatedXml);
    res.json("Deleted");
  }
});

app.listen(8084, () => {
  console.log("Delete Service is Running on port 8084 !");
});
