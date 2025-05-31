import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ItemList from "./components/ItemList";
import "./components/ItemList.css";

function App() {
  const [count, setCount] = useState(0);
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApiMessage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api");
        setApiMessage(response.data.message);
        setLoading(false);
      } catch (err) {
        setError("Error connecting to the server");
        setLoading(false);
        console.error("API Error:", err);
      }
    };

    fetchApiMessage();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MERN Stack with Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <div className="api-message">
          <h2>API Connection Test:</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {apiMessage && <p className="success">{apiMessage}</p>}
        </div>

        {/* Add the ItemList component only if we have a successful API connection */}
        {apiMessage && !error && <ItemList />}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
