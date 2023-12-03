import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import Card from "./Cards";

async function getBooks() {
  try {
    const result = await fetch("http://127.0.0.1:8082/get-items");
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function deleteBook1(id) {
  try {
    const response = await fetch("http://127.0.0.1:8084/delete-item", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = "ERROR!";
      throw new Error(message);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        setBooks([]);
      }
    }

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      const result = await deleteBook1(id);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.log("CANNOT DELETE !");
    }
  };

  return (
    <>
      <div className="books-page">
        <SearchBar />
        <Logo />
      </div>

      <div className="content-section">
        <div className="content-section-width">
          <h1>
            Total <span className="gold-word">{books.length}</span> Book(s)
            Found
          </h1>
          <div className="cards">
            {books.map((book) => (
              <Card key={book.id} book={book} deleteBook={deleteItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
