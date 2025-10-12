
import React from 'react';
import './Categorias.css';

const categoriasData = [
  { img: '/images/categoria_juegos/VALORANT.png', titulo: 'VALORANT', espectadores: '28.978 espectadores' },
  { img: '/images/categoria_juegos/CHARLANDO.jpg', titulo: 'Charlando', espectadores: '306.858 espectadores' },
  { img: '/images/categoria_juegos/LOL.png', titulo: 'League of Legends', espectadores: '68.932 espectadores' },
  { img: '/images/categoria_juegos/CSGO.png', titulo: 'Counter-Strike', espectadores: '39.332 espectadores' },
  { img: '/images/categoria_juegos/GTA V.jpg', titulo: 'Grand Theft Auto V', espectadores: '78.608 espectadores' },
  { img: '/images/categoria_juegos/FORTNITE.jpg', titulo: 'Fortnite', espectadores: '52.675 espectadores' },
  { img: '/images/categoria_juegos/MINECRAFT.jpg', titulo: 'Minecraft', espectadores: '27.601 espectadores' },
  { img: '/images/categoria_juegos/APEX.jpg', titulo: 'Apex Legends', espectadores: '32.164 espectadores' },
  { img: '/images/categoria_juegos/COD7.jpg', titulo: 'Call of Duty: Black Ops 7', espectadores: '40.064 espectadores' },
  { img: '/images/categoria_juegos/EA26.jpg', titulo: 'EA Sports FC 26', espectadores: '82.075 espectadores' },
  { img: '/images/categoria_juegos/IRL.png', titulo: 'IRL', espectadores: '14.788 espectadores' },
  { img: '/images/categoria_juegos/OVERWATCH.png', titulo: 'Overwatch 2', espectadores: '13.402 espectadores' },
  { img: '/images/categoria_juegos/MARVEL RIVALS.jpg', titulo: 'Marvel Rivals', espectadores: '30.136 espectadores' },
  { img: '/images/categoria_juegos/DEAD BY DAYLIGHT.jpg', titulo: 'Dead by Daylight', espectadores: '19.420 espectadores' },
  { img: '/images/categoria_juegos/CLASH ROYALE.jpg', titulo: 'Clash Royale', espectadores: '37.231 espectadores' },
  { img: '/images/categoria_juegos/MEGABONK.jpg', titulo: 'Megabonk', espectadores: '106.916 espectadores' },
  { img: '/images/categoria_juegos/SILENT HILL F.jpg', titulo: 'SILENT HILL f', espectadores: '13.875 espectadores' },
  { img: '/images/categoria_juegos/ROBLOX.jpg', titulo: 'ROBLOX', espectadores: '6237 espectadores' },
  { img: '/images/categoria_juegos/ROCKET LEAGUE.jpg', titulo: 'Rocket League', espectadores: '3689 espectadores' },
  { img: '/images/categoria_juegos/RUST.jpg', titulo: 'Rust', espectadores: '5862 espectadores' },
  { img: '/images/categoria_juegos/GENSHIN IMPACT.jpg', titulo: 'Genshin Impact', espectadores: '3098 espectadores' },
  { img: '/images/categoria_juegos/TOM CLANCY.jpg', titulo: "Tom Clancy's Rainbow", espectadores: '11.873 espectadores' },
  { img: '/images/categoria_juegos/COD-WARZONE.png', titulo: 'Call of Duty: Warzone', espectadores: '11.873 espectadores' },
  { img: '/images/categoria_juegos/PUGB.png', titulo: 'PUGB: BATTLEGROUNDS', espectadores: '6196 espectadores' },
  { img: '/images/categoria_juegos/RED-DEAD-REDEMPTION.jpg', titulo: 'Red Dead Redemption II', espectadores: '4074 espectadores' },
  { img: '/images/categoria_juegos/DOTA2.png', titulo: 'Dota 2', espectadores: '24.890 espectadores' },
  { img: '/images/categoria_juegos/PEAK.jpg', titulo: 'PEAK', espectadores: '6235 espectadores' },
];

const Categorias = () => {
  return (
    <div className="categorias-page">
      <div className="categorias-bar">
        <span className="active">Categorías</span>
        <span className="inactive">Canales en directo</span>
      </div>
      <div className="categorias-controls">
        <input type="text" placeholder="Buscar etiquetas de categoría" />
        <div>
          <label htmlFor="ordenar_categoria" style={{ marginRight: '0.7rem', color: '#fff', fontWeight: 500 }}>Ordenar por</label>
          <select id="ordenar_categoria">
            <option value="recomendado">Recomendado para ti</option>
            <option value="recientes">Espectadores</option>
          </select>
        </div>
      </div>
      <div className="categorias-grid">
        {categoriasData.map((cat, idx) => (
          <div className="categoria-card" key={idx}>
            <img src={cat.img} alt={cat.titulo} />
            <div className="categoria-info">
              <div className="categoria-nombre">{cat.titulo}</div>
              <div className="categoria-espectadores">{cat.espectadores}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
