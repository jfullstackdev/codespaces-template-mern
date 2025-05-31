import { useState, useEffect } from "react";
import axios from "axios";

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/items");
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching items");
      setLoading(false);
      console.error("API Error:", err);
    }
  };

  const handleInputChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.name) {
      return;
    }

    try {
      await axios.post("/api/items", newItem);
      setNewItem({ name: "", description: "" });
      fetchItems();
    } catch (err) {
      setError("Error creating item");
      console.error("API Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (err) {
      setError("Error deleting item");
      console.error("API Error:", err);
    }
  };

  return (
    <div className="item-list">
      <h2>Items from MongoDB</h2>

      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Item name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            placeholder="Item description (optional)"
          />
        </div>
        <button type="submit">Add Item</button>
      </form>

      {loading && <p>Loading items...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="items">
        {items.length === 0 && !loading ? (
          <li className="no-items">No items yet. Add one above!</li>
        ) : (
          items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-content">
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                <small>
                  Created on: {new Date(item.date).toLocaleDateString()}
                </small>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                &times;
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ItemList;
