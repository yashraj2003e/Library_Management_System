import { useEffect, useState } from "react";
import AddItem from "./AddItem";

export default function SearchBar({
  showAddItem,
  setshowAddItem,
  getBooks,
  setBooks,
}) {
  const [curInput, setInput] = useState("");

  useEffect(() => {
    async function oldBooks() {
      if (curInput === "") {
        let books = await getBooks();
        console.log(books);
        setBooks(books);
      }
    }
    oldBooks();
  }, [curInput]);

  async function deleteAll() {
    const result = await fetch("http://localhost:8085/delete-all", {
      method: "DELETE",
    });

    const data = await result.json();
    if (data == "0") {
      window.alert("No book(s) to delete !");
    } else if (data == "1") {
      window.alert("Book(s) deleted Successfully !");
    } else {
      window.alert("Some error occurred !");
    }

    console.log(data);

    setBooks([]);
  }

  async function searchBooks() {
    if (curInput === "") return;

    const data = await fetch("http://localhost:8092/search-items", {
      method: "POST",
      body: JSON.stringify({
        searchName: curInput,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await data.json();
    console.log(result);
    if (result === 0) {
      window.alert("No Book Found !");
    } else {
      setBooks(result);
    }
  }

  return (
    <div className="search-bar">
      {!showAddItem && (
        <>
          <button type="submit" onClick={deleteAll}>
            Delete All
          </button>
          <button type="submit" onClick={() => setshowAddItem((val) => !val)}>
            Add Book
          </button>
          <input type="text" onChange={(e) => setInput(e.target.value)}></input>
          <button type="submit" onClick={searchBooks}>
            Search
          </button>
          <button type="submit">Filters</button>
        </>
      )}
      {showAddItem && <AddItem setshowAddItem={setshowAddItem} />}
    </div>
  );
}
