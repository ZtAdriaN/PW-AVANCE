import React from "react";

const streamers = [
  {
    nombre: "Nezumivy",
    regalos: [
      { nombre: "Saludo por audio", precio: 100, img: "regalo1_nezu" },
      { nombre: "Zing personalizado", precio: 250, img: "regalo2_nezu" },
      { nombre: "Yape s/50", precio: 500, img: "regalo3_nezu" },
    ],
  },
  {
    nombre: "Microbusero",
    regalos: [
      { nombre: "Saludo por audio", precio: 100, img: "regalo1_mic" },
      { nombre: "Saludo por video", precio: 250, img: "regalo2_mic" },
      { nombre: "Yape s/50", precio: 500, img: "regalo3_mic" },
    ],
  },
  {
    nombre: "Bububuenas",
    regalos: [
      { nombre: "Nada", precio: 100, img: "regalo1_bubu" },
      { nombre: "Bolsa con aire", precio: 250, img: "regalo2_bubu" },
      { nombre: "Yape s/1", precio: 500, img: "regalo3_bubu" },
    ],
  },
];

const RegalosSubs = () => {
  const handleRegaloClick = (streamer, regalo) => {
    alert(
      `🎁 Confirmas que deseas canjear "${regalo.nombre}" de ${streamer.nombre} por ${regalo.precio} pts?`
    );
  };

  return (
    <div className="regalos-container">
      <h1 className="regalos-title" style={{ textAlign: "center" }}>
        Regalos para seguidores 🎁
      </h1>
      <div className="regalos-grid">
        {streamers.map((streamer) => (
          <div className="regalos-card" key={streamer.nombre}>
            <h2>{streamer.nombre}</h2>
            <div className="regalos-list">
              {streamer.regalos.map((regalo, index) => (
                <button
                  className="regalo-item"
                  key={index}
                  onClick={() => handleRegaloClick(streamer, regalo)}
                >
                  <div className="regalo-img">
                    <img
                      src={`/${regalo.img}.png`}
                      alt={regalo.nombre}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <p>{regalo.nombre}</p>
                  <span>{regalo.precio} pts</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegalosSubs;
