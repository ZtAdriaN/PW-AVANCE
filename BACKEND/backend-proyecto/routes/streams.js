
const express = require('express');
const router = express.Router();
const { User, Stream } = require('../models');
// Si tienes un modelo Streamer, agrégalo aquí:
// const { Streamer } = require('../models');

// Actualizar nivel del usuario
router.post('/update-level', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(`[update-level] name: ${name}`);
    if (!name) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    if (!account) {
      console.log(`[update-level] Usuario no encontrado: ${name}`);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Cada 1 hora transmitida = 1 nivel
    const horas = account.HorasTotales || 0;
    const nuevoNivel = 1 + Math.floor(horas);
    account.level = nuevoNivel;
    await account.save();
    console.log(`[update-level] Nivel calculado en BD: ${account.name} -> ${account.level} (Horas: ${horas})`);
    return res.json({ success: true, level: account.level });
  } catch (err) {
    console.error('[update-level] Error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Obtener cantidad de streams realizados por usuario
router.get('/count/:name', async (req, res) => {
  try {
    const { name } = req.params;
    let account = await User.findOne({ where: { name } });
    if (!account) return res.status(404).json({ error: 'Usuario no encontrado' });
    const count = await Stream.count({ where: { streamerId: account.id } });
    return res.json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/streams/create-by-name', async (req, res) => {
  try {
    const { name, title, description, config } = req.body;
    console.log('Petición para crear stream:', { name, title, description, config });
    if (!name || !title) {
      console.log('Datos inválidos recibidos');
      return res.status(400).json({ error: 'Datos inválidos' });
    }
    let account = await User.findOne({ where: { name } });
    console.log('Usuario encontrado:', account);
    // Si tienes modelo Streamer, descomenta la siguiente línea
    // if (!account) account = await Streamer.findOne({ where: { name } });
    if (!account) {
      console.log('Usuario no encontrado en la base de datos');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const record = await Stream.create({
      title,
      description: description || null,
      config: config || null,
      startTime: new Date(),
      endTime: null,
      status: 'activo',
      streamerId: account.id
    });
    console.log('Stream creado:', record);
    return res.json(record);
  } catch (err) {
    console.error('Error al crear stream:', err);
    res.status(400).json({ error: err.message });
  }
});

router.post('/streams/finish-by-name', async (req, res) => {
  try {
    const { name, simulatedHours } = req.body;
    if (!name) return res.status(400).json({ error: 'Datos inválidos' });
    let account = await User.findOne({ where: { name } });
    // Si tienes modelo Streamer, descomenta la siguiente línea
    // if (!account) account = await Streamer.findOne({ where: { name } });
    if (!account) return res.status(404).json({ error: 'Usuario no encontrado' });
    const active = await Stream.findOne({ where: { streamerId: account.id, status: 'activo' }, order: [['startTime', 'DESC']] });
    if (!active) return res.status(404).json({ error: 'No hay stream activo' });
    active.endTime = new Date();
    active.status = 'finalizado';
    await active.save();

    // Sumar horas simuladas al usuario si se envían
    if (simulatedHours && simulatedHours > 0) {
      account.HorasTotales = (account.HorasTotales || 0) + simulatedHours;
      await account.save();
    }

    return res.json(active);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
