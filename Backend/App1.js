// const { parseString, Builder } = require("xml2js");
// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "bookData.xml");
// const xml = fs.readFileSync(filePath).toString();
// parseString(xml, (err, result) => {
//   try {
//     // console.dir();
//     // result.books.book[0].id = 5;
//     console.log(result.books.book);
//     // const builder = new Builder();
//     // const xml = builder.buildObject(result);

//     // fs.writeFileSync("bookData.xml", xml, function (err, file) {
//     //   if (err) throw err;
//     //   console.log("File Saved");
//     // });
//   } catch (e) {
//     console.log("Not Found!");
//   }
// });

// const { parseString, Builder } = require("xml2js");
const { all } = require("axios");
const fs = require("fs");
const path = require("path");
const { xml2json } = require("xml-js");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const serializer = require("xmldom").XMLSerializer;
const express = require("express");

const app = express();
// const xml2json = require("./xml2json.js");
// Reading
const filePath = path.join(__dirname, "bookData.xml");
const xml = fs.readFileSync(filePath).toString();

const doc = new dom().parseFromString(xml, "application/xml");

// Example XPath query
// const select = xpath.useNamespaces({ ns: "http://example.com" });
// const result = select("//ns:book[2]/ns:id", doc);

// try {
//   console.log("XPath result:", result[0].textContent);
// } catch (e) {
//   console.log(1);
// }

// // Update
// const idNode = select("//ns:book[2]/ns:author", doc)[0];
// if (idNode) {
//   idNode.textContent = 5;
// }

// Serialize the modified XML document back to string
// const updatedXml = new serializer().serializeToString(doc);

// // Write the updated XML back to the file
// fs.writeFileSync(filePath, updatedXml);

// //adding a book
// console.log("XML updated successfully");

// const newBookElement = doc.createElementNS(
//   "http://example.com",
//   "ns:book xmlns:ns='http://example.com'"
// );
// const newIdElement = doc.createElementNS("http://example.com", "ns:id");
// const newTitleElement = doc.createElementNS("http://example.com", "ns:name");
// const newAuthorElement = doc.createElementNS("http://example.com", "ns:author");
// // Set values for 'id' and 'title'
// newIdElement.textContent = "New Book ID";
// newTitleElement.textContent = "New Book Title";
// newAuthorElement.textContent = "New Author Title";

// // Append 'id' and 'title' as child elements of the new 'book'
// newBookElement.appendChild(newIdElement);
// newBookElement.appendChild(newTitleElement);
// newBookElement.appendChild(newAuthorElement);

// // Append the new 'book' to the root of the document
// doc.documentElement.appendChild(newBookElement);

// Serialize the updated XML
// const updatedXml1 = new serializer().serializeToString(doc);

// // Write the updated XML back to the file
// // fs.writeFileSync(filePath, updatedXml1);

// console.log("New book added successfully");

// function xml2json(xml,  // element or document DOM node
//                   tab)  // tab or indent string for pretty output formatting
// omit or use empty string "" to supress.
// returns JSON string

// function json2xml(obj,  // javascript object
//                   tab)  // tab or indent string for pretty output formatting
//                         // omit or use empty string "" to supress.
// returns XML string

//print in object manner
const totalBooks = doc.getElementsByTagNameNS("http://example.com", "book");
// console.log(JSON.stringify(totalBooks[0].textContent).replace("\\r\\n", ","));
// console.log(xml2json.xml2json(doc, ""));
// console.log(totalBooks.length);

// 0 for first element and 1 for second element and so on
const nodeList = totalBooks[1];
for (let i = 0; i < nodeList.length; i++) {
  const bookElement = nodeList[i];

  // Access the properties of each 'ns:book' element
  const id = bookElement.querySelector("ns\\:id").textContent;
  const name = bookElement.querySelector("ns\\:name").textContent;
  const author = bookElement.querySelector("ns\\:author").textContent;

  // Print the details or do further processing
  console.log(`Book ${i + 1}:`);
  console.log(`  ID: ${id}`);
  console.log(`  Name: ${name}`);
  console.log(`  Author: ${author}`);
  console.log("\n");
}
console.log(nodeList);
let i = 1;
while (true) {
  try {
    const result = select(`//ns:book[${i}]`, doc);
    console.log(result[0].textContent);
    i = i + 1;
  } catch (e) {
    break;
  }
}

// const booksElement = doc.getElementsByTagName("books")[0];

// // Get all <ns:book> elements
// const bookElements = booksElement.getElementsByTagNameNS(
//   "http://example.com",
//   "book"
// );

// function xmlElementToObject(element) {
//   const obj = {};
//   for (let i = 0; i < element.children.length(); i++) {
//     const child = element.children[i];
//     obj[child.nodeName] = child.textContent;
//   }
//   return obj;
// }

// // Convert each <ns:book> element to an object
// const booksArray = Array.from(bookElements).map(xmlElementToObject);

// console.log(booksArray);

// console.log("Namespace URI:", namespaceURI);
app.use(express.json());
app.listen(8000, () => {
  console.log("Listening on port 8000 !");
});

app.get("/books", (req, res) => {
  const totalBooks = doc.getElementsByTagNameNS("", "book");
  let len = totalBooks.length;
  console.log(len);
  const arr = [];
  for (let x = 0; x < len; x++) {
    const nodeList = totalBooks[x];
    const id = nodeList.childNodes[0].textContent;
    const name = nodeList.childNodes[1].textContent;
    const author = nodeList.childNodes[2].textContent;
    const result = {
      id: id,
      name: name,
      author: author,
    };
    arr.push(result);
  }
  res.send(arr);
});

app.post("/books", (req, res) => {
  const val = req.body;
  console.log(val);
  const id = val.id;
  const name = val.name;
  const author = val.author;

  const newBookElement = doc.createElementNS("", "book");
  const newIdElement = doc.createElementNS("", "id");
  const newTitleElement = doc.createElementNS("", "name");
  const newAuthorElement = doc.createElementNS("", "author");

  newIdElement.textContent = id;
  newTitleElement.textContent = name;
  newAuthorElement.textContent = author;

  newBookElement.appendChild(newIdElement);
  newBookElement.appendChild(newTitleElement);
  newBookElement.appendChild(newAuthorElement);

  doc.documentElement.appendChild(newBookElement);

  const updatedXml1 = new serializer().serializeToString(doc);

  fs.writeFileSync(filePath, updatedXml1);

  res.status(200).send("Book Added Successfully !");
  return;
});
