import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Tienda.css";

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


  // Estado para edición
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', price: '', points: '' });

  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditItem({ name: item.name, price: item.price, points: item.points });
  };

  const handleEditSave = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...editItem } : item
    );
    setItems(updatedItems);
    localStorage.setItem(`store_${user.id}`, JSON.stringify(updatedItems));
    setEditId(null);
    setEditItem({ name: '', price: '', points: '' });
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditItem({ name: '', price: '', points: '' });
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem(`store_${user.id}`, JSON.stringify(updatedItems));
  };

  return (
    <div className="store-container">
      <h1 className="store-title">Mi tienda (Streamer)</h1>

      <div className="store-form">
        <input
          type="text"
          placeholder="Nombre del objeto"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="store-input"
        />
        <input
          type="number"
          placeholder="Precio en monedas"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="store-input"
        />
        <input
          type="number"
          placeholder="Puntos que otorga"
          value={newItem.points}
          onChange={(e) => setNewItem({ ...newItem, points: e.target.value })}
          className="store-input"
        />
        <button onClick={handleAddItem} className="store-button">
          Agregar
        </button>
      </div>

      <h2 className="store-subtitle">Objetos en venta</h2>

      {items.length === 0 ? (
        <p className="store-empty">No hay productos aún</p>
      ) : (
        <div className="store-items">
          {items.map((item) => (
            <div key={item.id} className="store-item-card">
              {editId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editItem.name}
                    onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                    className="store-input"
                  />
                  <input
                    type="number"
                    value={editItem.price}
                    onChange={e => setEditItem({ ...editItem, price: e.target.value })}
                    className="store-input"
                  />
                  <input
                    type="number"
                    value={editItem.points}
                    onChange={e => setEditItem({ ...editItem, points: e.target.value })}
                    className="store-input"
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={() => handleEditSave(item.id)} className="store-button">Guardar</button>
                    <button onClick={handleEditCancel} className="store-item-delete">Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{item.name}</h3>
                  <p>💰 {item.price} coins</p>
                  <p>⭐ {item.points} pts</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={() => handleEditClick(item)} className="store-button">Editar</button>
                    <button onClick={() => handleDelete(item.id)} className="store-item-delete">Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamerStore;
