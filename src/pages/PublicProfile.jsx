import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PublicProfile.css";

const PublicProfile = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    console.log("👤 Todos los usuarios:", users);
    console.log("👤 Buscando userId:", id);
    
    // Filtrar usuarios válidos y buscar por ID
    const foundUser = users.find(
      (u) => u && u.id != null && u.id.toString() === id
    );
    console.log("👤 Usuario encontrado:", foundUser);
    setUserProfile(foundUser || null);
  }, [id]);

  if (!userProfile) {
    return (
      <div className="profile-not-found">
        <h1>Perfil no encontrado</h1>
        <p>Este usuario no existe.</p>
        <Link to="/">Volver a inicio</Link>
      </div>
    );
  }

  return (
    <div className="public-profile">
      <div className="profile-header">
        <img
          src={userProfile.profilePicture}
          alt={userProfile.username}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>{userProfile.username}</h1>
          <p>{userProfile.role === "streamer" ? "Streamer" : "Usuario"}</p>
          {userProfile.description && (
            <p className="profile-description">
              "{userProfile.description}"
            </p>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value gems">
            💎 {userProfile.gems || 0}
          </div>
          <div className="stat-label">Gemas</div>
        </div>

        <div className="stat-card">
          <div className="stat-value level">
            🏆 {userProfile.level || 1}
          </div>
          <div className="stat-label">Nivel</div>
        </div>

        <div className="stat-card">
          <div className="stat-value points">
            ⭐ {userProfile.points || 0}
          </div>
          <div className="stat-label">Puntos</div>
        </div>
      </div>

      <div className="profile-streams">
        <h2 className="streams-title">
          📺 Streams pasados
        </h2>
        {userProfile.totalStreams > 0 ? (
          <p className="streams-content">
            Este usuario ha realizado {userProfile.totalStreams} streams.
          </p>
        ) : (
          <p className="streams-content empty">
            No hay streams aún.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
