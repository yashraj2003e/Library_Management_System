import { useState } from "react";
import AddItem from "./AddItem";

export default function SearchBar({ showAddItem, setshowAddItem }) {
  return (
    <div className="search-bar">
      {!showAddItem && (
        <>
          <button type="submit">Delete All</button>
          <button type="submit" onClick={() => setshowAddItem((val) => !val)}>
            Add Book
          </button>
          <input type="text"></input>
          <button type="submit">Search</button>
          <button type="submit">Filters</button>
        </>
      )}
      {showAddItem && <AddItem setshowAddItem={setshowAddItem} />}
    </div>
  );
}
