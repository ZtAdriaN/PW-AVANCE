import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const liveStreams = [
    {
      id: 1,
      title: "DIRECTO LIBRE RETOS DEL CHAT... 🔥",
      streamer: "peoplelite",
      category: "Fortnite",
      viewers: 38,
      thumbnail: "../images/stream1.jpg",
      isLive: true,
    },
    {
      id: 2,
      title: "El don stark 82 estoy en vivo",
      streamer: "eldonstark82",
      category: "Valorant",
      viewers: 35,
      thumbnail: "../images/stream2.png",
      isLive: true,
    },
    {
      id: 3,
      title: "COMENZANDO STREAM (necesito una nueva intro xd)",
      streamer: "bububuenas",
      category: "Charlando",
      viewers: 57,
      thumbnail: "../images/stream3.jpg",
      isLive: true,
    },
    {
      id: 4,
      title: "MI SUEÑO ES SER MICROBUSERO",
      streamer: "microbusero",
      category: "PEAK",
      viewers: 71,
      thumbnail: "../images/stream4.jpg",
      isLive: true,
    },
    {
      id: 5,
      title: "Gaming session with friends - Come join!",
      streamer: "nezumivy",
      category: "DEVOUR",
      viewers: 811,
      thumbnail: "../images/stream5.jpg",
      isLive: true,
    },
    {
      id: 6,
      title: "Diego Bertie Challenge",
      streamer: "gamer_pro",
      category: "Peak",
      viewers: 234,
      thumbnail: "../images/stream6.jpg",
      isLive: true,
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Just Chatting",
      viewers: "142K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=188&h=250&fit=crop",
    },
    {
      id: 2,
      name: "Fortnite",
      viewers: "95K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/33214-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=188&h=250&fit=crop",
    },
    {
      id: 3,
      name: "League of Legends",
      viewers: "87K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=188&h=250&fit=crop",
    },
    {
      id: 4,
      name: "Grand Theft Auto V",
      viewers: "76K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=188&h=250&fit=crop",
    },
    {
      id: 5,
      name: "Valorant",
      viewers: "65K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=188&h=250&fit=crop",
    },
    {
      id: 6,
      name: "Minecraft",
      viewers: "54K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=188&h=250&fit=crop",
    },
    {
      id: 7,
      name: "World of Warcraft",
      viewers: "43K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/18122-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=188&h=250&fit=crop",
    },
    {
      id: 8,
      name: "Apex Legends",
      viewers: "32K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/511224-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=188&h=250&fit=crop",
    },
    {
      id: 9,
      name: "Counter-Strike 2",
      viewers: "58K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=188&h=250&fit=crop",
    },
    {
      id: 10,
      name: "Call of Duty: Warzone",
      viewers: "45K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/512710-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=188&h=250&fit=crop",
    },
    {
      id: 11,
      name: "Dota 2",
      viewers: "38K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/29595-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=188&h=250&fit=crop",
    },
    {
      id: 12,
      name: "Overwatch 2",
      viewers: "35K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/515025-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=188&h=250&fit=crop",
    },
    {
      id: 13,
      name: "Rocket League",
      viewers: "28K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/30921-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=188&h=250&fit=crop",
    },
    {
      id: 14,
      name: "Fall Guys",
      viewers: "25K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/512980-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=188&h=250&fit=crop",
    },
    {
      id: 15,
      name: "FIFA 24",
      viewers: "22K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/1869092879-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=188&h=250&fit=crop",
    },
    {
      id: 16,
      name: "Among Us",
      viewers: "18K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/510218-188x250.jpg",
      fallback:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=188&h=250&fit=crop",
    },
    {
      id: 17,
      name: "PEAK",
      viewers: "15K",
      image:
        "https://static-cdn.jtvnw.net/ttv-boxart/1081998272_IGDB-285x380.jpg",
      fallback:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=188&h=250&fit=crop",
    },
    {
      id: 18,
      name: "DEVOUR",
      viewers: "12K",
      image:
        "https://static-cdn.jtvnw.net/ttv-boxart/836519689_IGDB-144x192.jpg",
      fallback:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=188&h=250&fit=crop",
    },
  ];

  const handleImageError = (e, fallbackSrc) => {
    e.target.src = fallbackSrc;
  };

  return (
    <div className="main-content">
      <Sidebar />
      <main className="content">
        <section>
          <h2 className="section-title">
            Canales en directo que podrían gustarte
          </h2>
          <div className="stream-grid">
            {liveStreams.map((stream) => (
              <Link
                key={stream.id}
                to={`/stream/${stream.id}`}
                className="stream-card-link"
              >
                <div className="stream-card">
                  <div className="stream-thumbnail">
                    <img src={stream.thumbnail} alt={stream.title} />
                    {stream.isLive && (
                      <div className="stream-overlay">EN DIRECTO</div>
                    )}
                    <div className="stream-viewers">
                      {stream.viewers} espectadores
                    </div>
                  </div>
                  <div className="stream-info">
                    <h3 className="stream-title">{stream.title}</h3>
                    <p className="stream-streamer">{stream.streamer}</p>
                    <p className="stream-category">{stream.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <h2 className="section-title">Explorar por categoría</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image">
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => handleImageError(e, category.fallback)}
                  />
                </div>
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-viewers">
                    {category.viewers} espectadores
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
