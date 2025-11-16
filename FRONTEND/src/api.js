// Funciones para conectar el frontend con el backend usando fetch

export async function registerUser(data) {
  const response = await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function loginUser(data) {
  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function getUserProfile(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  return await response.json();
}

export async function getProducts() {
  const response = await fetch('http://localhost:3000/products');
  return await response.json();
}

export async function createDonation(data) {
  const response = await fetch('http://localhost:3000/donations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function getUserPurchases(userId) {
  const response = await fetch(`http://localhost:3000/users/${userId}/purchases`);
  return await response.json();
}

export async function getAllUsers() {
  const response = await fetch('http://localhost:3000/users');
  return await response.json();
}

export async function getUserLevel(userId) {
  const response = await fetch(`http://localhost:3000/users/${userId}/level`);
  return await response.json();
}

export async function searchProducts(query, filter) {
  const params = new URLSearchParams({ search: query, filter });
  const response = await fetch(`http://localhost:3000/products/search?${params}`);
  return await response.json();
}

export async function getAdminDashboard() {
  const response = await fetch('http://localhost:3000/admin/dashboard');
  return await response.json();
}

export async function getUserNotifications(userId) {
  const response = await fetch(`http://localhost:3000/notifications/${userId}`);
  return await response.json();
}
