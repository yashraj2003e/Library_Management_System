// Sample SOAP request XML
const soapRequest = `
  <?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header/>
    <S:Body>
        <ns2:ValidateUserData xmlns:ns2="http://authorization.authorization.com/">
            <arg0>okok</arg0>
            <arg1>okok</arg1>
        </ns2:ValidateUserData>
    </S:Body>
</S:Envelope>
`;

// URL of your SOAP web service endpoint
const soapEndpoint =
  "http://localhost:8080/Authorization-1.0-SNAPSHOT/checkDataService";

// Define headers for the SOAP request
const headers = new Headers({
  "Content-Type": "text/xml",
});

// Define the fetch options
const fetchOptions = {
  method: "POST",
  headers: headers,
  body: soapRequest,
};

// Make the SOAP request using fetch
fetch(soapEndpoint, fetchOptions)
  .then((response) => response.text())
  .then((responseData) => {
    // Process the SOAP response data
    console.log(responseData);
  })
  .catch((error) => {
    // Handle errors
    console.error("Error:", error);
  });
