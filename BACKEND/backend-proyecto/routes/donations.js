const express = require('express');
const router = express.Router();
const { Donation, User } = require('../models');

// Registrar donación
router.post('/', async (req, res) => {
  try {
    const { donadorId, streamerId, amount, message, isAnonymous } = req.body;
    const donador = await User.findByPk(donadorId);
    if (!donador || donador.gems < amount) {
      return res.status(400).json({ error: 'Fondos insuficientes o usuario no encontrado' });
    }
    donador.gems -= amount;
    await donador.save();
    const donation = await Donation.create({
      donadorId,
      streamerId,
      amount,
      message,
      isAnonymous
    });
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Historial de donaciones de usuario
router.get('/:userId', async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { donadorId: req.params.userId },
      include: [{ model: User, as: 'streamer' }]
    });
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
