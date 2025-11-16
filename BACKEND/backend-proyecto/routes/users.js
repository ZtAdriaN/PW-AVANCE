const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, profilePicture, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      role
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener perfil
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar perfil
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Historial de compras
router.get('/:id/compras', async (req, res) => {
  // Aquí deberías consultar la tabla de compras del usuario
  res.json([]); // Devuelve un array vacío por ahora
});

// Listar todos los usuarios (admin)
router.get('/lista', async (req, res) => {
  // Aquí deberías verificar si el usuario es admin
  // y devolver la lista de usuarios
  res.json([]); // Devuelve un array vacío por ahora
});

// Niveles y recompensas
router.get('/:id/level', async (req, res) => {
  // Aquí deberías consultar el nivel y recompensas del usuario
  res.json({ level: 1, points: 0, rewards: [] });
});

module.exports = router;
