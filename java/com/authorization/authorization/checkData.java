package com.authorization.authorization;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileOutputStream;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService(targetNamespace = "http://www.validateUserData.com",serviceName = "ValidateUserData",portName = "ValidationOfUserCredentials",name = "UserValidation")
public class checkData {

    @WebMethod(operationName = "GetData",action = "")
    public int ValidateUserData(String username,String password) {
        try {
            File xmlFile = new File("C:\\Users\\yashg\\IdeaProjects\\Authorization\\src\\main\\java\\com\\authorization\\authorization\\userData.xml");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(xmlFile);

            NodeList userList = document.getElementsByTagName("user");

            for(int i=0;i<userList.getLength();i++) {
                Element userElement = (Element) userList.item(i);

                String userName = userElement.getElementsByTagName("username").item(0).getTextContent();
                String userPassword = userElement.getElementsByTagName("password").item(0).getTextContent();

                if(userName.equals(username) && userPassword.equals(password)) {
                    return 1;
                }

            }
            return 0;
        }
        catch(Exception error) {
            return 2;
        }
    }
}
