import { useEffect, useRef } from "react";
import image from "./images/atomichabits.jpg";
import image1 from "./images/clrs.jpg";
import image2 from "./images/curious.jpg";
import Card from "./Cards";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

function Books() {
  const books = useRef(undefined);

  useEffect(() => {
    const c = document.getElementsByClassName("cards");
    books.current = c[0];
  });

  console.log(books.current);
  return (
    <>
      <div className="books-page">
        <SearchBar />
        <Logo />
      </div>

      <div className="content-section">
        <div className="content-section-width">
          <h1>
            Total{" "}
            <span className="gold-word">
              {books.current === undefined
                ? "0"
                : books.current.childNodes.length}
            </span>{" "}
            Book(s) Found
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
            <Card name={"Introduction To Algorithms"} imgg={image1} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
