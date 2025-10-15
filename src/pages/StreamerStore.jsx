import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const StreamerStore = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", points: "" });

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem(`store_${user.id}`)) || [];
    setItems(storedItems);
  }, [user.id]);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.points) return;

    const updatedItems = [...items, { ...newItem, id: Date.now() }];
    setItems(updatedItems);
    localStorage.setItem(`store_${user.id}`, JSON.stringify(updatedItems));
    setNewItem({ name: "", price: "", points: "" });
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem(`store_${user.id}`, JSON.stringify(updatedItems));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mi tienda (Streamer)</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre del objeto"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio en monedas"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Puntos que otorga"
          value={newItem.points}
          onChange={(e) => setNewItem({ ...newItem, points: e.target.value })}
        />
        <button onClick={handleAddItem}>Agregar</button>
      </div>

      <h2>Objetos en venta</h2>
      {items.length === 0 ? (
        <p>No hay productos aún</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} coins - {item.points} pts
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreamerStore;
