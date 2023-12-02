import { useState } from "react";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Books from "./Components/Books";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {!isLogin && <HomePage isLogin={setIsLogin} />}
      <Login />
      <Books />
    </div>
  );
}
