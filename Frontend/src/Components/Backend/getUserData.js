const fs = require("fs");
const path = require("path");

const fileName = "output.txt";
const filePath = path.join(__dirname, fileName);

const firstLine = "This is the first line.";
const secondLine = "This is the second line.";

const content = `${firstLine}\n${secondLine}\n`;

fs.writeFileSync(filePath, content);
