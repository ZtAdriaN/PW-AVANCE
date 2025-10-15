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
    return storedUser
      ? { ...storedUser, points: storedUser.points ?? 0 }
      : null;
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    } catch (error) {
      return { success: false, error: "Error al iniciar sesión" };
    }
  };

  const register = async (
    username,
    email,
    password,
    confirmPassword,
    profilePicture,
    role = "user"
  ) => {
    try {
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      const sessionData = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        profilePicture: userData.profilePicture,
        role: userData.role,
        gems: userData.gems,
        level: userData.level,
        points: userData.points,
        pointsToNextLevel: userData.pointsToNextLevel,
        streamingHours: userData.streamingHours,
        totalStreams: userData.totalStreams,
      };

      setUser(sessionData);
      localStorage.setItem("currentUser", JSON.stringify(sessionData));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error al registrar usuario" };
    }
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
