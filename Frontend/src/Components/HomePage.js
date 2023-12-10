/* eslint-disable jsx-a11y/alt-text */
import image from "../assets/landing_page.jpg";
import "../index.css";
import companyLogo from "../assets/company3.png";

export default function HomePage({ isLogin, setAdmin }) {
  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const headingStyle = {
    position: "absolute",
    top: "18%",
    left: "45%",
    fontSize: "6.5rem",
  };

  const headingStyle1 = {
    position: "absolute",
    top: "34%",
    left: "50%",
    fontSize: "6.5rem",
  };

  const headingStyle2 = {
    position: "absolute",
    top: "49%",
    left: "67%",
    fontSize: "6.5rem",
    color: "#0c2f5b",
  };

  function set() {
    setAdmin((admin) => !admin);
    isLogin((f) => !f);
  }

  return (
    <>
      <div className="main-page" style={{ overflow: "hidden" }}>
        <img src={companyLogo} className="company-logo"></img>
        <img style={imageStyle} src={image}></img>
        <h1 style={headingStyle}>
          <span>🧠 Li</span>
          <span style={{ color: "#0c2f5b" }}>brary 📚</span>
        </h1>
        <h1 style={headingStyle1}>
          <span>Mana</span>
          <span style={{ color: "#0c2f5b" }}>gement</span>
        </h1>
        <h1 style={headingStyle2}>System</h1>
      </div>
      <div className="main-page-buttons">
        <button className="admin-btn" onClick={() => set()}>
          Admin
        </button>
        <button className="student-btn">Student</button>
      </div>
    </>
  );
}
