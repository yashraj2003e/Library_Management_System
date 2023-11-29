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

app.get("/get-items", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const author = req.body.author;
  const issueCost = req.body.cost;
  const data = req.body.text;

  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");
  const root = doc.getElementsByTagName("book");
  // console.log(root[7].childNodes[5].textContent);
  const arr = [];
  for (let i = 0; i < root.length; i++) {
    if (root[i].childNodes.length > 5) {
      const bookData = {
        id: root[i].childNodes[1].textContent,
        name: root[i].childNodes[3].textContent,
        author: root[i].childNodes[5].textContent,
        cost: root[i].childNodes[7].textContent,
        data: root[i].childNodes[9].textContent,
      };
      arr.push(bookData);
    } else {
      const bookData = {
        id: root[i].childNodes[0].textContent,
        name: root[i].childNodes[1].textContent,
        author: root[i].childNodes[2].textContent,
        cost: root[i].childNodes[3].textContent,
        data: root[i].childNodes[4].textContent,
      };
      arr.push(bookData);
    }
  }
  res.send(arr);
});

app.listen(8082, () => {
  console.log("Read Service is Running on port 8082 !");
});
