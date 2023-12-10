import axios from "axios";
import { useState } from "react";

export default function AddItem({ setshowAddItem }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [book, setBook] = useState("");

  async function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function uploadBook(e) {
    e.preventDefault();

    const formData1 = new FormData();
    formData1.append("file", book);

    try {
      const res1 = await fetch("http://localhost:8081/upload", {
        method: "POST",
        body: formData1,
      });
    } catch (e) {
      console.log(e);
    }

    const res2 = await fetch("http://localhost:8081/add-item", {
      method: "POST",
      body: JSON.stringify({
        id: await getRandomInt(1, Number.MAX_SAFE_INTEGER),
        name: name,
        author: author,
        cost: cost,
        genre: genre,
        text: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setshowAddItem((val) => !val);
  }

  return (
    <div className="add-item-card">
      <h1>Add Item</h1>
      <form onSubmit={(e) => uploadBook(e)}>
        <table>
          <tr>
            <td>Book Name</td>
            <td>
              <input onChange={(e) => setName(e.target.value)}></input>
            </td>
          </tr>
          <tr>
            <td>Author</td>
            <td>
              <input onChange={(e) => setAuthor(e.target.value)}></input>
            </td>
          </tr>
          <tr>
            <td>Cost</td>
            <td>
              <input onChange={(e) => setCost(e.target.value)}></input>
            </td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>
              <input onChange={(e) => setGenre(e.target.value)}></input>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <textarea
                rows={10}
                cols={21}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Book Image</td>
            <td>
              <input
                type="file"
                onChange={(e) => setBook(e.target.files[0])}
              ></input>
            </td>
          </tr>
        </table>
        <button style={{ marginLeft: "10vw" }}>Add</button>
      </form>
    </div>
  );
}
