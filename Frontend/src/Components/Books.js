import image from "./images/atomichabits.jpg";
import image1 from "./images/clrs.jpg";
import image2 from "./images/curious.jpg";
import Card from "./Cards";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

function Books() {
  const imggg = require("./images/atomichabits.jpg");
  return (
    <>
      <div className="books-page">
        <SearchBar />
        <Logo />
      </div>

      <div className="content-section">
        <div className="content-section-width">
          <h1>
            Total <span className="gold-word">0</span> Book(s) Found
          </h1>
          <div className="cards">
            <Card name={"Atomic Habits"} imgg={image} />
            <Card name={"Introduction To Algorithms"} imgg={image1} />
            <Card
              name={"The Curious Incident of the Dog in the Night-Time"}
              imgg={image2}
            />
            <Card
              name={"The Curious Incident of the Dog in the Night-Time"}
              imgg={image2}
            />
            <Card
              name={"The Curious Incident of the Dog in the Night-Time"}
              imgg={image2}
            />
            <Card name={"Atomic Habits"} imgg={image} />
            <Card name={"Introduction To Algorithms"} imgg={image1} />
            <Card name={"Atomic Habits"} imgg={image} />
            <Card name={"Introduction To Algorithms"} imgg={imggg} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
