import React, { useState, useEffect } from "react";

export default function Card({ book, deleteBook }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imgModule = await import(`./images/${book.imgPath}`);
        setImage(imgModule.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);

  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt="Book Logo" />
      </div>
      <p className="book-title">{book.name}</p>
      <button>View 🪟</button>
      <button>Update ✒️</button>
      <button onClick={() => deleteBook(book.id)}>Delete ❌</button>
    </div>
  );
}
