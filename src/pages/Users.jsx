import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('registeredUsers');
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      setUsers(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setUsers([]);
    }
  }, []);

  return (
    <div className="main-content">
      <div className="content">
        <div className="page-content">
          <h1 className="page-title">Usuarios Registrados</h1>

          {users.length === 0 ? (
            <p style={{ color: 'white' }}>No hay usuarios registrados aún.</p>
          ) : (
            <div className="user-list">
              {users.map((u) => (
                <div key={u.id} className="user-item">
                  <img src={u.profilePicture} alt={u.username} />
                  <div className="user-item-info">
                    <div className="user-name">{u.username}</div>
                    <div className="user-email">{u.email}</div>
                    <div className="user-password">Contraseña: {u.password}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;