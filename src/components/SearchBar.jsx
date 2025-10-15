import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrar usuarios
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const results = users.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleClick = (id) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/user/${id}`);
  };

  return (
    <div className="header-center" ref={searchRef}>
      <input
        type="text"
        placeholder="Buscar usuario o streamer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchResults.length > 0 && (
        <div className="search-dropdown">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="search-result-item"
              onClick={() => handleClick(user.id)}
            >
              {user.username} {user.role === "streamer" && "🎥"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
