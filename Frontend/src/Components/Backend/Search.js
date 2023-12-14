const dom = require("xmldom").DOMParser;
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

app.post("/search-items", (req, res) => {
  const query = req.body.searchName;
  const xml = fs.readFileSync(filePath).toString();
  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");
  const books = select(`/books/book[contains(name, '${query}')]`, doc);
  const arr = [];
  if (books.length === 0) {
    res.json(0);
  } else {
    for (let i = 0; i < books.length; i++) {
      let root = books[i];
      if (root.childNodes.length >= 13) {
        const bookData = {
          imgPath: root.childNodes[1].textContent,
          id: root.childNodes[3].textContent,
          name: root.childNodes[5].textContent,
          author: root.childNodes[7].textContent,
          cost: root.childNodes[9].textContent,
          genre: root.childNodes[11].textContent,
          data: root.childNodes[13].textContent,
        };
        arr.push(bookData);
      } else {
        const bookData = {
          imgPath: root.childNodes[0].textContent,
          id: root.childNodes[1].textContent,
          name: root.childNodes[2].textContent,
          author: root.childNodes[3].textContent,
          cost: root.childNodes[4].textContent,
          genre: root.childNodes[5].textContent,
          data: root.childNodes[6].textContent,
        };
        arr.push(bookData);
      }
    }
    res.json(arr);
  }
});

app.listen(8092, () => {
  console.log("Search Service is Running on port 8092 !");
});
