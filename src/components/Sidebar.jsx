import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const followedChannels = [
    {
      id: 1,
      name: "nezumivy",
      category: "DEVOUR",
      viewers: 811,
      avatar:
        "https://img.freepik.com/premium-vector/young-gamer-girl-avatar-streaming-with-colored-hair-gaming-headset_704771-3536.jpg",
      categoryImage:
        "https://static-cdn.jtvnw.net/ttv-boxart/836519689_IGDB-144x192.jpg",
    },
    {
      id: 2,
      name: "microbusero",
      category: "PEAK",
      viewers: 71,
      avatar:
        "https://cdna.artstation.com/p/assets/images/images/038/833/284/large/heleca-twitch-avatar-sasori-3.jpg?1624208447",
      categoryImage:
        "https://static-cdn.jtvnw.net/ttv-boxart/1081998272_IGDB-285x380.jpg",
    },
    {
      id: 3,
      name: "bububuenas",
      category: "Charlando",
      viewers: 57,
      avatar:
        "https://cdna.artstation.com/p/assets/images/images/036/064/094/large/noa-garzon-pp-twitch-con-fondo.jpg?1616623918",
      categoryImage: "https://static-cdn.jtvnw.net/ttv-boxart/509658-40x53.jpg",
    },
  ];

  const recommendedChannels = [
    {
      id: 4,
      name: "dontstark82",
      category: "Fortnite",
      viewers: 35,
      avatar:
        "https://images.insmind.com/market-operations/market/side/689bba0a91114c2a8504aaa0d24315cd/1739863420380.jpg?x-oss-process=image/format,webp",
      categoryImage: "https://static-cdn.jtvnw.net/ttv-boxart/33214-40x53.jpg",
    },
    {
      id: 5,
      name: "peoplelite",
      category: "Just Chatting",
      viewers: 38,
      avatar: "https://n9.cl/onkymf",
      categoryImage:
        "https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
    },
  ];

  const categories = [
    {
      name: "Just Chatting",
      viewers: "142K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/509658-40x53.jpg",
    },
    {
      name: "Fortnite",
      viewers: "95K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/33214-40x53.jpg",
    },
    {
      name: "League of Legends",
      viewers: "87K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/21779-40x53.jpg",
    },
    {
      name: "Grand Theft Auto V",
      viewers: "76K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-40x53.jpg",
    },
    {
      name: "Valorant",
      viewers: "65K",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/516575-40x53.jpg",
    },
  ];

  return (
    <aside className="sidebar">
      {user?.role === "streamer" && (
        <div className="sidebar-section">
          <h3 className="sidebar-title">Mi Tienda</h3>
          <div className="sidebar-item">
            <a href="/mi-tienda" className="sidebar-item-name">
              Administrar Tienda
            </a>
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <h3 className="sidebar-title">Canales Seguidos</h3>
        {followedChannels.map((channel) => (
          <div key={channel.id} className="sidebar-item">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="sidebar-item-avatar"
            />
            <div className="sidebar-item-info">
              <div className="sidebar-item-name">{channel.name}</div>
              <div className="sidebar-item-content">
                <img
                  src={channel.categoryImage}
                  alt={channel.category}
                  className="sidebar-item-category-image"
                />
                <div>
                  <div className="sidebar-item-category">
                    {channel.category}
                  </div>
                  <div className="sidebar-item-viewers">
                    {channel.viewers} espectadores
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Canales Recomendados</h3>
        {recommendedChannels.map((channel) => (
          <div key={channel.id} className="sidebar-item">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="sidebar-item-avatar"
            />
            <div className="sidebar-item-info">
              <div className="sidebar-item-name">{channel.name}</div>
              <div className="sidebar-item-content">
                <img
                  src={channel.categoryImage}
                  alt={channel.category}
                  className="sidebar-item-category-image"
                />
                <div>
                  <div className="sidebar-item-category">
                    {channel.category}
                  </div>
                  <div className="sidebar-item-viewers">
                    {channel.viewers} espectadores
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Categorías Recomendadas</h3>
        {categories.map((category, index) => (
          <div key={index} className="sidebar-item">
            <img
              src={category.image}
              alt={category.name}
              className="sidebar-item-category-image"
            />
            <div className="sidebar-item-info">
              <div className="sidebar-item-name">{category.name}</div>
              <div className="sidebar-item-viewers">
                {category.viewers} espectadores
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
