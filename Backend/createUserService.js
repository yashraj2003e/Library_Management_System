const dom = require("xmldom").DOMParser;

async function getData() {
  const getData = await fetch(
    "http://localhost:8080/Authorization-1.0-SNAPSHOT/setDataService",
    {
      method: "POST",
      body: `<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header/>
    <S:Body>
        <ns2:setUserData xmlns:ns2="http://authorization.authorization.com/">
            <arg0>ok</arg0>
            <arg1>oaadaadk</arg1>
        </ns2:setUserData>
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
}

getData();
