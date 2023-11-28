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

app.delete("/delete-item", (req, res) => {
  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");

  const id = req.body.id;

  let result1 = select(`/books/book[${id}]`, doc);
  if (result1.length == 0) {
    res.json("00");
  }

  if (result1.length) {
    result1[0].parentNode.removeChild(result1[0]);
    const updatedXml = new XMLSerializer().serializeToString(doc);
    fs.writeFileSync(filePath, updatedXml);
    res.json("Deleted");
  } else {
    res.json("Empty");
  }
});

app.listen(8084, () => {
  console.log("Delete Service is Running on port 8084 !");
});
