// Registrar recarga de gemas
export async function topupGems(userId, amount, method) {
  const response = await fetch(`http://localhost:3000/users/${userId}/topup-gems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, method })
  });
  return await response.json();
}
// Sumar punto por mensaje en el chat
export async function addChatPoint(userId, message, streamId) {
  const response = await fetch(`http://localhost:3000/users/${userId}/add-chat-point`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, streamId })
  });
  return await response.json();
}
// Actualizar gemas del usuario
export async function updateUserGems(id, gems) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gems })
  });
  return await response.json();
}
// Obtener cantidad de streams realizados por usuario
export async function getUserStreamCount(id) {
  const response = await fetch(`http://localhost:3000/users/${id}/streams/count`);
  return await response.json();
}
// Actualizar nivel del usuario
export async function updateUserLevel(name, level) {
  const response = await fetch('http://localhost:3000/api/update-level', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, level })
  });
  return await response.json();
}
// Crear stream
export async function createStreamByName(data) {
  const response = await fetch('http://localhost:3000/api/streams/create-by-name', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// Finalizar stream
export async function finishStreamByName(data) {
  const response = await fetch('http://localhost:3000/api/streams/finish-by-name', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
// Listar todos los usuarios
export async function getAllUsers() {
  const response = await fetch('http://localhost:3000/users/all');
  return await response.json();
}

// Buscar usuarios por nombre o email
export async function searchUsers(query) {
  const response = await fetch(`http://localhost:3000/users/search?q=${encodeURIComponent(query)}`);
  return await response.json();
}

// Eliminar usuario
export async function deleteUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
}

// Verificar si el usuario es streamer
export async function isUserStreamer(id) {
  const response = await fetch(`http://localhost:3000/users/${id}/isStreamer`);
  return await response.json();
}

// Obtener streams del usuario
export async function getUserStreams(id) {
  const response = await fetch(`http://localhost:3000/users/${id}/streams`);
  return await response.json();
}
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
  const response = await fetch('http://localhost:3000/donations/donation', {
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

// Obtener donaciones recibidas por un streamer
export async function getStreamerDonations(streamerId) {
  const response = await fetch(`http://localhost:3000/donations/streamer/${streamerId}/received`);
  return await response.json();
}
