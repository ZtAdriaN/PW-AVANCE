const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Listar todos los usuarios
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar usuarios por nombre o email
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const users = await User.findAll({
      where: {
        [sequelize.Op.or]: [
          { name: { [sequelize.Op.like]: `%${q}%` } },
          { email: { [sequelize.Op.like]: `%${q}%` } }
        ]
      }
    });
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verificar si el usuario es streamer
router.get('/:id/isStreamer', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ isStreamer: user.isStreamer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener streams del usuario (si es streamer)
router.get('/:id/streams', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT * FROM streams WHERE streamerId = :userId ORDER BY startTime DESC
    `, {
      replacements: { userId: req.params.id },
      type: sequelize.QueryTypes.SELECT
    });
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Registrar usuario
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.body.name + ext);
  }
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, email, password, role, isStreamer } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    let profilePicturePath = req.file
      ? `/images/${req.file.filename}`
      : '/src/assets/default-avatar.svg';

    const user = await User.create({
      name,
      email,
      password,
      role: role === 'streamer' ? 'streamer' : 'user',
      isStreamer: isStreamer === 'true' || isStreamer === true,
      profilePicture: profilePicturePath
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
    if (user.password !== password) return res.status(401).json({ error: 'Contraseña incorrecta' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener perfil por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar perfil por ID
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

// Historial de compras del usuario por ID
router.get('/:id/compras', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT p.id, p.name, p.description, p.price, p.categoryId, pu.purchaseTime
      FROM purchases pu
      JOIN products p ON pu.productId = p.id
      WHERE pu.userId = :userId
      ORDER BY pu.purchaseTime DESC
    `, {
      replacements: { userId: req.params.id },
      type: sequelize.QueryTypes.SELECT
    });
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Niveles y recompensas

// Nivel del usuario
router.get('/:id/level', async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      SELECT level, achievedAt FROM levels WHERE userId = :userId ORDER BY achievedAt DESC LIMIT 1
    `, {
      replacements: { userId: req.params.id },
      type: sequelize.QueryTypes.SELECT
    });
    if (!result) return res.json({ level: 1, achievedAt: null });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
