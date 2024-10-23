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
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isCustomQuantity, setIsCustomQuantity] = useState(false); // To track custom input
  const [customQuantity, setCustomQuantity] = useState(""); // For custom quantity input

  const handleInputChange = (e) => {
    console.log(e.target);
    setInputValue(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomQuantity(true);
      setSelectedValue(customQuantity);
    } else {
      setIsCustomQuantity(false);
      setSelectedQuantity(Number(value));
    }
  };

  const handCustomQuantityChange = (e) => {
    setCustomQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    // Prevent the page from reloading
    e.preventDefault();

    if (inputValue !== "") {
      const newItem = {
        id: Date.now(),
        description: inputValue,
        quantity: isCustomQuantity ? customQuantity : selectedQuantity,
        packed: false,
      };

      handleAddItem(newItem);
      setInputValue("");
      setCustomQuantity("");
      setSelectedQuantity(1 /* reset to default */);
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
        value={inputValue}
      />
      <select
        value={isCustomQuantity ? "custom" : selectedQuantity}
        onChange={handleQuantityChange}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
        <option value="custom">Custom</option>
      </select>
      {isCustomQuantity && (
        <input
          className="input-custom"
          type="number"
          placeholder="How many?"
          value={customQuantity}
          onChange={handCustomQuantityChange}
        />
      )}
      <button className="button" type="submit">
        Add
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
  const [isPacked, setIsPacked] = useState(item.packed);
  const handleDelete = () => {
    setIsPacked((prevState) => !prevState);
  };

  return (
    <li>
      <span style={isPacked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDelete}>✖️</button>
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
