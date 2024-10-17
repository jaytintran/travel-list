import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "📝 Passports", quantity: 2, packed: true },
  { id: 2, description: "🧦 Socks", quantity: 12, packed: false },
];

function Logo() {
  return (
    <header className="header">
      <h1 className="header-logo">🏖️ Far Away 🧳</h1>
    </header>
  );
}

function Form({ handleAddItem }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    if (inputValue !== "") {
      const newItem = {
        id: Date.now(),
        description: inputValue,
        quantity: 1,
        packed: false,
      };

      handleAddItem(newItem);
      setInputValue("");
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <input
        className="input"
        type="text"
        placeholder="Enter your thing..."
        onChange={handleInputChange}
      />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>

        <Sorting />
      </div>
    </>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>✖️</button>
    </li>
  );
}

function Sorting() {
  return (
    <select name="sort" id="sort">
      <option value="docs">Documents</option>
      <option value="utilities">Untities</option>
      <option value="clothes">Clothes</option>
    </select>
  );
}

function Stats({ items }) {
  return (
    <div className="stats">
      <em>You have {items.length} things to pack, you already packed %</em>
    </div>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  console.log("Items:", items);

  return (
    <div className="app">
      <Logo />

      <Form handleAddItem={handleAddItem} />

      <PackingList items={items} />

      <Stats items={items} />
    </div>
  );
}

export default App;
