import { useState } from "react";
import "./index.css";

function Logo() {
  return (
    <header className="header">
      <h1 className="header-logo">🏖️ Far Away 🧳</h1>
    </header>
  );
}

function Form() {
  return (
    <form className="add-form">
      <input
        className="input"
        type="text"
        placeholder="Enter your destination..."
      />
      <button className="button">Search</button>
    </form>
  );
}

function PackingList() {
  return (
    <>
      <div className="list">
        <ul>
          <li className="item">🎧 Headphones</li>
          <li className="item">📚 Notebook</li>
          <li className="item">✈️ Plane Ticket</li>
        </ul>
      </div>
      <div className="stats">Summary</div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Logo />

      <Form />

      <PackingList />
    </div>
  );
}

export default App;
