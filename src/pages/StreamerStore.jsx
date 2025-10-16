import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Tienda.css";

const STORAGE_KEY = (id) => `store_${id}`;

export default function StreamerStore() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", points: "" });

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({ name: "", price: "", points: "" });
  const [error, setError] = useState("");

  // Load items del streamer
  useEffect(() => {
    if (!user?.id) return;
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY(user.id))) || [];
    setItems(stored);
  }, [user?.id]);

  // Persist helper
  const persist = (next) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY(user.id), JSON.stringify(next));
  };

  // Validaciones
  const validate = ({ name, price, points }) => {
    if (!name?.trim()) return "El nombre es obligatorio.";
    const p = Number(price);
    const pts = Number(points);
    if (!Number.isFinite(p) || p <= 0) return "El costo debe ser un número > 0.";
    if (!Number.isInteger(pts) || pts <= 0) return "Los puntos deben ser un entero > 0.";
    return "";
  };

  // Crear
  const handleAdd = (e) => {
    e.preventDefault();
    const msg = validate(newItem);
    if (msg) return setError(msg);

    const toSave = {
      id: Date.now(),
      name: newItem.name.trim(),
      price: Number(newItem.price),
      points: Number(newItem.points),
    };
    persist([toSave, ...items]);
    setNewItem({ name: "", price: "", points: "" });
    setError("");
  };

  // Editar (entrar en modo edición)
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditDraft({ name: item.name, price: item.price, points: item.points });
    setError("");
  };

  // Guardar edición
  const saveEdit = () => {
    const msg = validate(editDraft);
    if (msg) return setError(msg);

    const next = items.map((it) =>
      it.id === editingId
        ? {
            ...it,
            name: editDraft.name.trim(),
            price: Number(editDraft.price),
            points: Number(editDraft.points),
          }
        : it
    );
    persist(next);
    setEditingId(null);
    setError("");
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ name: "", price: "", points: "" });
    setError("");
  };

  // Eliminar
  const handleDelete = (id) => {
    const next = items.filter((it) => it.id !== id);
    persist(next);
  };

  return (
    <div className="store-container">
      <h1 className="store-title">Mi Tienda de Regalos</h1>

      <form className="store-form" onSubmit={handleAdd} noValidate>
        <div className="store-field">
          <label htmlFor="name">Nombre del regalo</label>
          <input
            id="name"
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem((s) => ({ ...s, name: e.target.value }))}
            placeholder="Ej. Saludo en vivo"
            required
          />
        </div>

        <div className="store-field">
          <label htmlFor="price">Costo (monedas)</label>
          <input
            id="price"
            type="number"
            min="1"
            step="0.01"
            value={newItem.price}
            onChange={(e) => setNewItem((s) => ({ ...s, price: e.target.value }))}
            placeholder="Ej. 250"
            required
          />
        </div>

        <div className="store-field">
          <label htmlFor="points">Puntos</label>
          <input
            id="points"
            type="number"
            min="1"
            step="1"
            value={newItem.points}
            onChange={(e) => setNewItem((s) => ({ ...s, points: e.target.value }))}
            placeholder="Ej. 30"
            required
          />
        </div>

        <button className="store-add">Añadir</button>
      </form>

      {error && <div className="store-error">{error}</div>}

      {items.length === 0 ? (
        <p className="store-empty">Aún no tienes regalos. ¡Crea el primero!</p>
      ) : (
        <div className="store-grid">
          {items.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <article key={item.id} className="store-item">
                {!isEditing ? (
                  <>
                    <header className="store-item-header">
                      <h3 className="store-item-name">{item.name}</h3>
                    </header>
                    <div className="store-item-info">
                      <span className="store-item-chip">💰 {item.price}</span>
                      <span className="store-item-chip">⭐ {item.points} pts</span>
                    </div>
                    <div className="store-item-actions">
                      <button
                        type="button"
                        className="store-item-btn"
                        onClick={() => startEdit(item)}
                        aria-label={`Editar ${item.name}`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="store-item-btn danger"
                        onClick={() => handleDelete(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="store-edit-row">
                      <label>Nombre</label>
                      <input
                        type="text"
                        value={editDraft.name}
                        onChange={(e) =>
                          setEditDraft((s) => ({ ...s, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="store-edit-row">
                      <label>Costo</label>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={editDraft.price}
                        onChange={(e) =>
                          setEditDraft((s) => ({ ...s, price: e.target.value }))
                        }
                      />
                    </div>
                    <div className="store-edit-row">
                      <label>Puntos</label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={editDraft.points}
                        onChange={(e) =>
                          setEditDraft((s) => ({ ...s, points: e.target.value }))
                        }
                      />
                    </div>
                    <div className="store-item-actions">
                      <button type="button" className="store-item-btn" onClick={saveEdit}>
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="store-item-btn ghost"
                        onClick={cancelEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
