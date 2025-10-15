import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StoreView = () => {
  const { streamerId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem(`store_${streamerId}`)) || [];
    setItems(storedItems);
  }, [streamerId]);

  const handleBuy = (item) => {
    alert(`Compraste: ${item.name} y ganaste ${item.points} puntos`);
    // Aquí luego se integrará con puntos del usuario
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tienda del streamer</h1>
      {items.length === 0 ? (
        <p>Este streamer aún no tiene productos.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} coins
              <button onClick={() => handleBuy(item)}>Comprar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreView;
