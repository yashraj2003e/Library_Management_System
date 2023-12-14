package com.authorization.authorization;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.ext.Provider;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.print.Doc;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileOutputStream;

@WebService(targetNamespace = "http://www.validateUserData.com",name = "SetUserData",serviceName = "AddUserData",portName = "AddingUserData")
public class setData {

    @WebMethod(operationName = "AddUserData",action = "")
    public int setUserData(String username,String password) {
        try {
            File xmlFile = new File("C:\\Users\\yashg\\IdeaProjects\\Authorization\\src\\main\\java\\com\\authorization\\authorization\\userData.xml");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(xmlFile);

            Element newUserDetails = document.createElement("user");

            Element newUserName = document.createElement("username");
            Element newPassword = document.createElement("password");

            newUserName.appendChild(document.createTextNode(username));
            newPassword.appendChild(document.createTextNode(password));

            newUserDetails.appendChild(newUserName);
            newUserDetails.appendChild(newPassword);

            Element privacyDetailsElement = document.getDocumentElement();
            privacyDetailsElement.appendChild(newUserDetails);

            FileOutputStream fileOutputStream = new FileOutputStream(xmlFile);
            javax.xml.transform.Transformer transformer = javax.xml.transform.TransformerFactory.newInstance().newTransformer();
            transformer.transform(new javax.xml.transform.dom.DOMSource(document),new javax.xml.transform.stream.StreamResult(fileOutputStream));
            return 1;
        }
        catch(Exception error) {
            return 2;
        }
    }


}
