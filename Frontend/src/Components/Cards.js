import image from "./images/atomichabits.jpg";
export default function Card({ name, imgg }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={imgg} alt="Book Logo" />
      </div>
      <p className="book-title">{name}</p>
      <button>View 🪟</button>
      <button>Update ✒️</button>
      <button>Delete ❌</button>
    </div>
  );
}
