import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PublicProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    // Filtrar usuarios válidos y buscar por ID
    const foundUser = users.find(
      (u) => u && u.id != null && u.id.toString() === userId
    );
    setUserProfile(foundUser || null);
  }, [userId]);

  if (!userProfile) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Perfil no encontrado</h1>
        <p>Este usuario no existe.</p>
        <Link to="/">Volver a inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div className="profile-header">
        <img
          src={userProfile.profilePicture}
          alt={userProfile.username}
          className="profile-avatar"
          style={{ width: "150px", borderRadius: "50%" }}
        />
        <h1>{userProfile.username}</h1>
        <p>{userProfile.role === "streamer" ? "Streamer" : "Usuario"}</p>
        <p>{userProfile.description || "Este usuario no tiene descripción"}</p>
      </div>

      <div className="profile-stats" style={{ marginTop: "20px" }}>
        <p>Gemas: {userProfile.gems || 0}</p>
        <p>Nivel: {userProfile.level || 0}</p>
        <p>Puntos: {userProfile.points || 0}</p>

        {userProfile.role === "streamer" && (
          <Link
            to={`/store/${userProfile.id}`}
            className="store-link-button"
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              textDecoration: "none",
              marginTop: "10px",
            }}
          >
            🛒 Ir a la tienda
          </Link>
        )}
      </div>

      <div className="profile-streams" style={{ marginTop: "30px" }}>
        <h2>Streams pasados</h2>
        {userProfile.totalStreams > 0 ? (
          <p>Este usuario ha realizado {userProfile.totalStreams} streams.</p>
        ) : (
          <p>No hay streams aún.</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
