import { useState } from "react";
import companyLogo from "../assets/company4.png";
import companyLogoHover from "../assets/company5.png";

export default function Logo() {
  const [mouse, setMouse] = useState(false);
  return (
    <div className="logo-section">
      <img
        alt="Company's Logo"
        src={mouse ? companyLogoHover : companyLogo}
        onMouseEnter={() => setMouse((inside) => !inside)}
        onMouseLeave={() => setMouse((inside) => !inside)}
        className="company-logo"
      ></img>
    </div>
  );
}
