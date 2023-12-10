const dom = require("xmldom").DOMParser;
const fs = require("fs");
const path = require("path");

const fileName = "./data.txt";
const filePath = path.join(__dirname, fileName);

const fileContent = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);

if (fileContent.length < 2) {
  console.error("Insufficient lines in the file");
  process.exit(1);
}

const userName = fileContent[0].trim();
const userPass = fileContent[1].trim();

async function getData() {
  try {
    const response = await fetch(
      "http://localhost:8080/Authorization-1.0-SNAPSHOT/AddUserData",
      {
        method: "POST",
        body: `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
                <SOAP-ENV:Header/>
                  <S:Body>
                    <ns2:AddUserData xmlns:ns2="http://www.validateUserData.com">
                    <arg0>${userName}</arg0>
                    <arg1>${userPass}</arg1>
                    </ns2:AddUserData>
                  </S:Body>
                </S:Envelope>`,
        headers: {
          "Content-type": "text/xml",
        },
      }
    );

    const data = await response.text();
    const doc = new dom().parseFromString(data, "application/xml");
    console.log(doc.getElementsByTagName("return")[0].textContent);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

getData();
