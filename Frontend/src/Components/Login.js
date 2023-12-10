/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import file from "../Components/Backend/data.txt";
import bookImg from "../assets/book.png";

const dom = require("xmldom").DOMParser;

export default function Login({ setIsLogging }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function putData() {
    const data = await fetch("http://localhost:8090/updateCreds", {
      method: "POST",
      body: JSON.stringify({
        username1: username,
        password1: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    return result;
  }

  async function getData() {
    const data = await fetch("http://localhost:8091/getUser", {
      method: "POST",
      body: JSON.stringify({
        username1: username,
        password1: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    return result;
  }

  async function checkUserData(username, password) {}

  async function addUserData(username, password) {
    const data = fetch("http://localhost:8087/createUser", { method: "GET" });
    const response = (await data).json();
    return response;
  }

  async function validateDetails(e) {
    e.preventDefault();

    if (isLogin) {
      const get = await getData();
      const res = await checkUserData(username, password);
      if (get === 1) {
        setIsLogging((login) => !login);
      } else if (get === 0) {
        window.alert("Unrecognized User or Password !");
      } else {
        window.alert("Some error occurred !");
      }
    } else {
      const add = await putData();
      const res = await addUserData(username, password);
      if (add === 1) {
        setIsLogging((login) => !login);
      }
    }
  }

  return (
    <div className="login-container">
      <img src={bookImg} alt="Book-Image"></img>
      <div className="login-boxes">
        <form action="" onSubmit={(e) => validateDetails(e)}>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {isLogin && <button className="admin-btn">Login</button>}
          {!isLogin && <button className="admin-btn">Create User</button>}
        </form>
      </div>
      <div className="login-buttons">
        {!isLogin && (
          <button
            className="login-right-button"
            onClick={() => setIsLogin((isLogin) => !isLogin)}
          >
            Login
          </button>
        )}
        {isLogin && (
          <button
            className="login-right-button"
            onClick={() => setIsLogin((isLogin) => !isLogin)}
          >
            Create User
          </button>
        )}
      </div>
    </div>
  );
}
