const dom = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const path = require("path");
const fs = require("fs");
const xpath = require("xpath");
const express = require("express");
const cors = require("cors");

const filePath = path.join(__dirname, "Books.xml");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("App is running !");
});

app.get("/get-items", (req, res) => {
  const xml = fs.readFileSync(filePath).toString();
  const doc = new dom().parseFromString(xml, "application/xml");
  const root = doc.getElementsByTagName("book");
  const arr = [];
  for (let i = 0; i < root.length; i++) {
    if (root[i].childNodes.length >= 13) {
      const bookData = {
        imgPath: root[i].childNodes[1].textContent,
        id: root[i].childNodes[3].textContent,
        name: root[i].childNodes[5].textContent,
        author: root[i].childNodes[7].textContent,
        cost: root[i].childNodes[9].textContent,
        genre: root[i].childNodes[11].textContent,
        data: root[i].childNodes[13].textContent,
      };
      arr.push(bookData);
    } else {
      const bookData = {
        imgPath: root[i].childNodes[0].textContent,
        id: root[i].childNodes[1].textContent,
        name: root[i].childNodes[2].textContent,
        author: root[i].childNodes[3].textContent,
        cost: root[i].childNodes[4].textContent,
        genre: root[i].childNodes[5].textContent,
        data: root[i].childNodes[6].textContent,
      };
      arr.push(bookData);
    }
  }
  res.send(JSON.stringify(arr));
});

app.listen(8082, () => {
  console.log("Read Service is Running on port 8082 !");
});
