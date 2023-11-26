const express = require("express");
const bodyParser = require("body-parser");
const bodyParserXML = require("body-parser-xml");
const { DOMParser } = require("xmldom");
const convert = require("xml-js");

// const app = express();
// const port = 8000;

// bodyParserXML(bodyParser);

// app.use(bodyParser.xml());

// app.post("/post", (req, res) => {
//   const xmlString = `
//     <root>
//         <name>ok</name>
//     </root>
//   `;

//   let xmlParser = new DOMParser();
//   let animalXml = xmlParser.parseFromString(xmlString, "text/xml");
//   let jsonData = JSON.parse(convert.xml2json(animalXml.toString()));
//   res.status(200).send(jsonData.elements[0].elements[0].elements[0].text);
// });

// app.get("/post", (req, res) => {
//   res.send("Welcome !");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// server.js
const xpath = require("xpath");

const app = express();
const port = 3001;

app.use(bodyParser.text({ type: "text/xml" }));

// Example XML data
let xmlData = `
<data>
  <books>
    <book>
      <id>1</id>
      <name>Introduction to Algorithms</name>
    </book>
    <book>
      <id>2</id>
      <name>Machine Learning</name>
    </book>
  </books>
</data>
`;

app.get("/api/data", (req, res) => {
  // Implement your READ operation using XPath
  const doc = new DOMParser().parseFromString(xmlData, "text/xml");
  const result = xpath.select("//books/book[2]", doc);

  res.send(JSON.parse(convert.xml2json(result.toString())));
});

app.post("/api/data", (req, res) => {
  // Implement your CREATE operation
  let xmlParser = new DOMParser();
  let animalXml = xmlParser.parseFromString(req.body, "text/xml");

  // Convert the XML document to JSON using xml-js library
  let jsonObj = JSON.parse(
    convert.xml2json(animalXml.toString(), { compact: true, spaces: 4 })
  );

  res.status(200).send(jsonObj);
});

app.put("/api/data/:id", (req, res) => {
  // Implement your UPDATE operation using XPath
  const itemId = req.params.id;
  const updatedItemXml = req.body; // Assuming the request body contains the updated XML item

  // Update the XML data based on the provided ID
  // ...

  res.send("Item updated successfully");
});

app.delete("/api/data/:id", (req, res) => {
  // Implement your DELETE operation using XPath
  const itemId = req.params.id;

  // Remove the item with the specified ID from the XML data
  // ...

  res.send("Item deleted successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
