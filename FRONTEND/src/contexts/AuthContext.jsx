import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(); // ✅ Ahora está exportado

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    return storedUser ? storedUser : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }, [user]);

  const handleDonate = (amount, message, isAnonymous) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, gems: prev.gems - amount };
    });
    console.log(`Donaste ${amount} gemas a ${message || "sin mensaje"}!`);
  };

  const [loading, setLoading] = useState(true);

  const getRegisteredUsers = () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  };

  const saveRegisteredUser = (userData) => {
    const users = getRegisteredUsers();
    users.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  const findUserByEmail = (email) => {
    const users = getRegisteredUsers();
    return users.find((user) => user.email === email);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Primero intenta con el backend
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (result && result.id) {
        const userData = {
          id: result.id,
          name: result.name || result.username || '',
          username: result.name || result.username || '',
          email: result.email,
          profilePicture: result.profilePicture || '/src/assets/default-avatar.svg',
          role: result.role || 'user',
          gems: result.gems ?? 1000,
          streamingHours: result.streamingHours ?? 0,
          totalStreams: result.totalStreams ?? 0,
          level: result.level || 1,
          points: result.points || 0,
          pointsToNextLevel: result.pointsToNextLevel || 100,
          streamingHours: result.streamingHours || 0,
          totalStreams: result.totalStreams || 0,
          isStreamer: result.isStreamer || false
        };
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return { success: true, user: userData };
      }
    } catch (error) {
      // Si falla el backend, intenta con local
      const registeredUser = findUserByEmail(email);
      if (!registeredUser) {
        return {
          success: false,
          error: "No existe una cuenta con este correo electrónico",
        };
      }
      if (registeredUser.password !== password) {
        return { success: false, error: "Contraseña incorrecta" };
      }
      const userData = {
        id: registeredUser.id,
        email: registeredUser.email,
        username: registeredUser.username,
        profilePicture: registeredUser.profilePicture,
        role: registeredUser.role || "user",
        gems: registeredUser.gems || 1000,
        level: registeredUser.level || 1,
        points: registeredUser.points || 0,
        pointsToNextLevel: registeredUser.pointsToNextLevel || 100,
        streamingHours: registeredUser.streamingHours || 0,
        totalStreams: registeredUser.totalStreams || 0,
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: "Error al iniciar sesión" };
  };

  const register = async (
    username,
    email,
    password,
    confirmPassword,
    profilePicture,
    role = "user"
  ) => {
    // Intenta primero con el backend
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password, role })
      });
      const result = await response.json();
      if (result && result.id) {
        const userData = {
          id: result.id,
          name: result.name || username,
          username: result.name || username,
          email: result.email,
          profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : '/src/assets/default-avatar.svg',
          role: result.role || role,
          gems: result.gems || 1000,
          level: result.level || 1,
          points: result.points || 0,
          pointsToNextLevel: result.pointsToNextLevel || 100,
          streamingHours: result.streamingHours || 0,
          totalStreams: result.totalStreams || 0,
          isStreamer: result.isStreamer || false
        };
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return { success: true };
      }
    } catch (error) {
      // Si falla el backend, usa local
      if (!username || username.length < 3) {
        return {
          success: false,
          error: "El nombre de usuario debe tener al menos 3 caracteres",
        };
      }
      if (password !== confirmPassword) {
        return { success: false, error: "Las contraseñas no coinciden" };
      }
      if (password.length < 6) {
        return {
          success: false,
          error: "La contraseña debe tener al menos 6 caracteres",
        };
      }
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          error: "Ya existe una cuenta con este correo electrónico",
        };
      }
      let profilePictureUrl;
      if (profilePicture) {
        profilePictureUrl = URL.createObjectURL(profilePicture);
      } else {
        profilePictureUrl = "/src/assets/default-avatar.svg";
      }
      const userData = {
        id: Date.now(),
        email,
        username,
        password,
        profilePicture: profilePictureUrl,
        role: role,
        gems: 1000,
        level: 1,
        points: 0,
        pointsToNextLevel: 100,
        streamingHours: 0,
        totalStreams: 0,
      };
      saveRegisteredUser(userData);
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Error al registrar usuario" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    setUser,
    handleDonate,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
