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

export async function startStreamerSession(id) {
  const response = await fetch(`http://localhost:3000/users/${id}/stream/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

export async function addStreamerSeconds(id, seconds) {
  const response = await fetch(`http://localhost:3000/users/${id}/stream/add-time`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seconds })
  });
  return await response.json();
}

export async function addStreamerSecondsByName(name, seconds) {
  const response = await fetch(`http://localhost:3000/users/stream/add-time-by-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, seconds })
  });
  return await response.json();
}

export async function getUserOrStreamerById(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  return await response.json();
}

export async function getUserOrStreamerByName(name) {
  const response = await fetch(`http://localhost:3000/users/by-name/${encodeURIComponent(name)}`);
  return await response.json();
}

export async function addPointsByName(name, points) {
  const response = await fetch(`http://localhost:3000/users/stream/add-points-by-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, points })
  });
  return await response.json();
}

export async function createStreamByName(name, title, description, config) {
  const response = await fetch(`http://localhost:3000/users/streams/create-by-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, title, description, config })
  });
  return await response.json();
}

export async function finishStreamByName(name) {
  const response = await fetch(`http://localhost:3000/users/streams/finish-by-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return await response.json();
}

export async function addGems(userId, amount) {
  const response = await fetch(`http://localhost:3001/users/${userId}/gems/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  return await response.json();
}

export async function addGemsByName(name, amount) {
  const response = await fetch(`http://localhost:3001/users/gems/add-by-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, amount })
  });
  return await response.json();
}

export async function deductGems(userId, amount) {
  const response = await fetch(`http://localhost:3001/users/${userId}/gems/deduct`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  return await response.json();
}

export async function deductGemsByName(name, amount) {
  const response = await fetch(`http://localhost:3001/users/gems/deduct-by-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, amount })
  });
  return await response.json();
}

export async function purchaseItem(userId, productId) {
  const response = await fetch(`http://localhost:3001/users/${userId}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
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
