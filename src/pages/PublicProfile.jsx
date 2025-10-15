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
    </div>
  );
};

export default PublicProfile;
