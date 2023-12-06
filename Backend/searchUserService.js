const dom = require("xmldom").DOMParser;

const fn = async function getData() {
  const getData = await fetch(
    "http://localhost:8080/Authorization-1.0-SNAPSHOT/checkDataService",
    {
      method: "POST",
      body: `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header/>
    <S:Body>
        <ns2:ValidateUserData xmlns:ns2="http://authorization.authorization.com/">
            <arg0>ok</arg0>
            <arg1>oadk</arg1>
        </ns2:ValidateUserData>
    </S:Body>
</S:Envelope>`,
      headers: {
        "Content-type": "text/xml",
      },
    }
  );
  const data = await getData.text();
  const doc = new dom().parseFromString(data, "application/xml");
  console.log(doc.getElementsByTagName("return")[0].textContent);
};

fn();
