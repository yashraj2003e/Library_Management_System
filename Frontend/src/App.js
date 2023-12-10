import { useState } from "react";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Books from "./Components/Books";
import AddItem from "./Components/AddItem";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  return (
    <div>
      {!isLogin && !admin && (
        <HomePage isLogin={setIsLogin} setAdmin={setAdmin} />
      )}
      {isLogin && <Login setIsLogging={setIsLogin} />}
      {admin && <Books />}
    </div>
  );
}
