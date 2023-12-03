const dom = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const path = require("path");
const fs = require("fs");
const xpath = require("xpath");
const express = require("express");

const filePath = path.join(__dirname, "Books.xml");

const app = express();
app.use(express.json());

app.get("/test", (_req, res) => {
  res.send("App is running !");
});

app.delete("/delete-all", (req, res) => {
  const xml = fs.readFileSync(filePath).toString();

  const select = xpath.useNamespaces({});
  const doc = new dom().parseFromString(xml, "application/xml");

  const totalBooks = select("/books/*", doc);
  if (totalBooks.length === 0) {
    res.json("File is already Empty !");
  } else {
    fs.truncateSync(filePath);
    fs.writeFileSync(filePath, "<books></books>");
    res.json("Deleted");
  }
});

app.listen(8085, () => {
  console.log("Delete All Server is running on port 8085 !");
});
