import { useState } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {!isLogin && <HomePage isLogin={setIsLogin} />}
      <Login />
    </div>
  );
}
