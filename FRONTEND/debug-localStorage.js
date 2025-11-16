console.log("=== DEBUG localStorage ===");

// Verificar usuarios registrados
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
console.log("Usuarios registrados:", registeredUsers);
console.log("Total usuarios:", registeredUsers.length);

// Mostrar cada usuario
registeredUsers.forEach((user, index) => {
  console.log(`Usuario ${index + 1}:`, {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  });
});

// Verificar usuario actual
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log("Usuario actual:", currentUser);