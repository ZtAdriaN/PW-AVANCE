const express = require('express');
const router = express.Router();
const { User, Streamer, Product, Purchase, sequelize, Stream } = require('../models');
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
    const sid = req.params.id;
    const streamer = await Streamer.findByPk(sid);
    if (streamer) return res.json({ isStreamer: true });
    const user = await User.findByPk(sid);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.json({ isStreamer: !!user.isStreamer });
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
    if (role === 'streamer' || isStreamer === 'true' || isStreamer === true) {
      const streamer = await Streamer.create({
        name,
        email,
        password,
        profilePicture: profilePicturePath
      });
      return res.status(201).json({
        id: streamer.id,
        name,
        email,
        role: 'streamer',
        isStreamer: true,
        profilePicture: profilePicturePath
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        role: 'user',
        isStreamer: false,
        profilePicture: profilePicturePath
      });
      return res.status(201).json(user);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) {
      if (user.password !== password) return res.status(401).json({ error: 'Contraseña incorrecta' });
      return res.json(user);
    }
  const streamer = await Streamer.findOne({ where: { email } });
  if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
  if (streamer.password !== password) return res.status(401).json({ error: 'Contraseña incorrecta' });
  return res.json({
    id: streamer.id,
    name: streamer.name,
    email: streamer.email,
    role: 'streamer',
    isStreamer: true,
    profilePicture: streamer.profilePicture || '/src/assets/default-avatar.svg',
    gems: streamer.gems || 1000,
    streamingHours: streamer.streamingHours || 0
  });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener perfil por ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user) return res.json(user);
    const streamer = await Streamer.findByPk(id);
    if (streamer) {
      return res.json({
        id: streamer.id,
        name: streamer.name,
        email: streamer.email,
        role: 'streamer',
        isStreamer: true,
        profilePicture: streamer.profilePicture || '/src/assets/default-avatar.svg',
        gems: streamer.gems || 1000,
        streamingHours: streamer.streamingHours || 0
      });
    }
    return res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    let account = await User.findOne({ where: { name } });
    if (account) return res.json({ id: account.id, name: account.name, streamingHours: account.streamingHours || 0, level: account.level || 1, points: account.points || 0, pointsToNextLevel: account.pointsToNextLevel || 100 });
    const streamer = await Streamer.findOne({ where: { name } });
    if (streamer) return res.json({ id: streamer.id, name: streamer.name, streamingHours: streamer.streamingHours || 0, level: streamer.level || 1, points: streamer.points || 0, pointsToNextLevel: streamer.pointsToNextLevel || 100 });
    return res.status(404).json({ error: 'Usuario no encontrado' });
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
router.post('/:id/stream/start', async (req, res) => {
  try {
    const id = req.params.id;
    let account = await User.findByPk(id);
    if (account) {
      return res.json({ started: true });
    }
    const streamer = await Streamer.findByPk(id);
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.json({ started: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/stream/add-time', async (req, res) => {
  try {
    const { seconds } = req.body;
    if (!seconds || seconds <= 0) return res.status(400).json({ error: 'Tiempo inválido' });
    const id = req.params.id;
    let account = await User.findByPk(id);
    if (account) {
      const hours = Number(seconds) / 10;
      account.streamingHours = Number(account.streamingHours || 0) + hours;
      await account.save();
      return res.json({ id: account.id, streamingHours: account.streamingHours });
    }
    const streamer = await Streamer.findByPk(id);
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    const hours = Number(seconds) / 10;
    streamer.streamingHours = Number(streamer.streamingHours || 0) + hours;
    await streamer.save();
    return res.json({ id: streamer.id, streamingHours: streamer.streamingHours });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/stream/add-time-by-name', async (req, res) => {
  try {
    const { name, seconds } = req.body;
    if (!name || !seconds || seconds <= 0) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    const hours = Number(seconds) / 10;
    if (account) {
      account.streamingHours = Number(account.streamingHours || 0) + hours;
      await account.save();
      return res.json({ id: account.id, name: account.name, streamingHours: account.streamingHours });
    }
    const streamer = await Streamer.findOne({ where: { name } });
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    streamer.streamingHours = Number(streamer.streamingHours || 0) + hours;
    await streamer.save();
    return res.json({ id: streamer.id, name: streamer.name, streamingHours: streamer.streamingHours });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/streams/create-by-name', async (req, res) => {
  try {
    const { name, title, description, config } = req.body;
    if (!name || !title) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    if (!account) account = await Streamer.findOne({ where: { name } });
    if (!account) return res.status(404).json({ error: 'Usuario no encontrado' });
    const record = await Stream.create({
      title,
      description: description || null,
      config: config || null,
      startTime: new Date(),
      endTime: null,
      status: 'activo',
      streamerId: account.id
    });
    return res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/streams/finish-by-name', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    if (!account) account = await Streamer.findOne({ where: { name } });
    if (!account) return res.status(404).json({ error: 'Usuario no encontrado' });
    const active = await Stream.findOne({ where: { streamerId: account.id, status: 'activo' }, order: [['startTime', 'DESC']] });
    if (!active) return res.status(404).json({ error: 'No hay stream activo' });
    active.endTime = new Date();
    active.status = 'finalizado';
    await active.save();
    return res.json(active);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/stream/add-points-by-name', async (req, res) => {
  try {
    const { name, points } = req.body;
    if (!name || !points || points <= 0) return res.status(400).json({ error: 'Datos inválidos' });
    const applyIncrement = (entity) => {
      let accPoints = Number(entity.points || 0) + Number(points);
      let level = Number(entity.level || 1);
      let threshold = Number(entity.pointsToNextLevel || 100);
      while (accPoints >= threshold) {
        accPoints -= threshold;
        level += 1;
        threshold = Math.ceil(threshold * 1.2);
      }
      entity.level = level;
      entity.points = accPoints;
      entity.pointsToNextLevel = threshold;
    };
    let account = await User.findOne({ where: { name } });
    if (account) {
      applyIncrement(account);
      await account.save();
      return res.json({ id: account.id, name: account.name, level: account.level, points: account.points, pointsToNextLevel: account.pointsToNextLevel });
    }
    const streamer = await Streamer.findOne({ where: { name } });
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    applyIncrement(streamer);
    await streamer.save();
    return res.json({ id: streamer.id, name: streamer.name, level: streamer.level, points: streamer.points, pointsToNextLevel: streamer.pointsToNextLevel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post('/:id/gems/add', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Monto inválido' });
    const id = req.params.id;
    let account = await User.findByPk(id);
    if (account) {
      account.gems = (account.gems || 0) + Number(amount);
      await account.save();
      return res.json({ id: account.id, gems: account.gems });
    }
    const streamer = await Streamer.findByPk(id);
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    streamer.gems = (streamer.gems || 0) + Number(amount);
    await streamer.save();
    return res.json({ id: streamer.id, gems: streamer.gems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/gems/deduct', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Monto inválido' });
    const id = req.params.id;
    let account = await User.findByPk(id);
    if (account) {
      if ((account.gems || 0) < amount) return res.status(400).json({ error: 'Fondos insuficientes' });
      account.gems = Number(account.gems || 0) - Number(amount);
      await account.save();
      return res.json({ id: account.id, gems: account.gems });
    }
    const streamer = await Streamer.findByPk(id);
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    if ((streamer.gems || 0) < amount) return res.status(400).json({ error: 'Fondos insuficientes' });
    streamer.gems = Number(streamer.gems || 0) - Number(amount);
    await streamer.save();
    return res.json({ id: streamer.id, gems: streamer.gems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sumar/restar gems por nombre (para compatibilidad con frontend)
router.post('/gems/add-by-name', async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name || !amount || amount <= 0) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    if (account) {
      account.gems = (account.gems || 0) + Number(amount);
      await account.save();
      return res.json({ id: account.id, gems: account.gems });
    }
    const streamer = await Streamer.findOne({ where: { name } });
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    streamer.gems = (streamer.gems || 0) + Number(amount);
    await streamer.save();
    return res.json({ id: streamer.id, gems: streamer.gems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/gems/deduct-by-name', async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name || !amount || amount <= 0) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    if (account) {
      if ((account.gems || 0) < amount) return res.status(400).json({ error: 'Fondos insuficientes' });
      account.gems = Number(account.gems || 0) - Number(amount);
      await account.save();
      return res.json({ id: account.id, gems: account.gems });
    }
    const streamer = await Streamer.findOne({ where: { name } });
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    if ((streamer.gems || 0) < amount) return res.status(400).json({ error: 'Fondos insuficientes' });
    streamer.gems = Number(streamer.gems || 0) - Number(amount);
    await streamer.save();
    return res.json({ id: streamer.id, gems: streamer.gems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/purchase', async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'Producto requerido' });
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    const id = req.params.id;
    let account = await User.findByPk(id);
    if (account) {
      if ((account.gems || 0) < product.price) return res.status(400).json({ error: 'Fondos insuficientes' });
      account.gems = Number(account.gems || 0) - Number(product.price);
      await account.save();
      await Purchase.create({ userId: account.id, productId });
      return res.json({ id: account.id, gems: account.gems });
    }
    const streamer = await Streamer.findByPk(id);
    if (!streamer) return res.status(404).json({ error: 'Usuario no encontrado' });
    if ((streamer.gems || 0) < product.price) return res.status(400).json({ error: 'Fondos insuficientes' });
    streamer.gems = Number(streamer.gems || 0) - Number(product.price);
    await streamer.save();
    return res.json({ id: streamer.id, gems: streamer.gems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
