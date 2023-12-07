/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import file from "../Components/Backend/data.txt";
import bookImg from "../assets/book.png";

const dom = require("xmldom").DOMParser;

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function checkUserData(username, password) {}

  async function validateDetails(e) {
    e.preventDefault();

    if (isLogin) {
      const res = await checkUserData(username, password);
    }
    // } else {
    //   addUserData(username, password);
    // }
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
