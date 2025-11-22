const express = require('express');
const router = express.Router();
const { Donation, User } = require('../models');


// REQUERIMIENTO 24
// Enviar regalo (producto)
router.post('/gift', async (req, res) => {
  try {
    const { donorId, streamerId, productId, message, isAnonymous } = req.body;
    const donador = await User.findByPk(donorId);
    if (!donador) {
      return res.status(400).json({ error: 'Usuario donador no encontrado' });
    }
    const { Product, User: UserModel } = require('../models');
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(400).json({ error: 'Regalo no encontrado' });
    }
    if (donador.gems < product.price) {
      return res.status(400).json({ error: 'Fondos insuficientes' });
    }

    // Sumar puntos
    if (product.points) {
      donador.points = (donador.points || 0) + product.points;
    }
    // Recalcular nivel y pointsToNextLevel
    if (donador.points >= donador.pointsToNextLevel) {
      donador.level = (donador.level || 1) + 1;
      donador.points = donador.points - donador.pointsToNextLevel;
      donador.pointsToNextLevel = 100; // O la lógica que desees para el siguiente nivel
    }
    // Restar gemas
    donador.gems -= product.price;
    await donador.save();

    // Determinar nombres
    let donadorName = 'Anónimo';
    if (!isAnonymous && donador && donador.name) {
      donadorName = donador.name;
    }
    let streamerName = '';
    const streamer = await UserModel.findByPk(streamerId);
    if (streamer && streamer.name) {
      streamerName = streamer.name;
    }

    // Mensaje personalizado
    let donationMessage = null;
    if (typeof message === 'string' && message.trim().length > 0) {
      donationMessage = message.trim();
    }

    const donation = await Donation.create({
      donorId: donorId,
      donor: donadorName,
      streamerId,
      streamer: streamerName,
      productId,
      product: product.name,
      amount: product.price,
      message: donationMessage,
      isAnonymous
    });

    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Donación normal (solo dinero)
router.post('/donation', async (req, res) => {
  try {
    console.log('Donación recibida:', req.body);
    const { donorId, streamerId, streamerName, amount, message, isAnonymous } = req.body;
    console.log('Buscando usuario donador con id:', donorId, typeof donorId);
    const donador = await User.findByPk(donorId);
    if (!donador) {
      console.log('Usuario donador no encontrado');
      return res.status(400).json({ error: 'Usuario donador no encontrado' });
    }
    if (donador.gems < amount) {
      console.log('Fondos insuficientes');
      return res.status(400).json({ error: 'Fondos insuficientes' });
    }
    donador.gems -= amount;
    await donador.save();

    // Sumar puntos por donación normal (ejemplo: 1 punto por cada 10 monedas donadas)
    const puntosGanados = Math.floor(amount / 10);
    if (puntosGanados > 0) {
      donador.points = (donador.points || 0) + puntosGanados;
    }
    // Recalcular nivel y pointsToNextLevel
    if (donador.points >= donador.pointsToNextLevel) {
      donador.level = (donador.level || 1) + 1;
      donador.points = donador.points - donador.pointsToNextLevel;
      donador.pointsToNextLevel = 100; // O la lógica que desees para el siguiente nivel
    }
    await donador.save();

    let donationMessage = null;
    if (typeof message === 'string' && message.trim().length > 0) {
      donationMessage = message.trim();
    }

    // Obtener nombres
    let donadorName = 'Anónimo';
    if (!isAnonymous && donador && donador.name) {
      donadorName = donador.name;
    }
    // streamerName se recibe desde req.body

    const donation = await Donation.create({
      donorId: donorId,
      donor: donadorName,
      streamerId,
      streamerName,
      amount,
      message: donationMessage,
      isAnonymous
    });
    console.log('Donación creada:', donation);
    res.status(201).json(donation);
  } 
  catch (err) {
    console.error('Error al crear donación:', err);
    res.status(400).json({ error: err.message });
  }
});


// REQUERIMIENTO 25
// Obtener las últimas donaciones/regalos recibidos por el streamer
router.get('/streamer/:streamerId/received', async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { streamerId: req.params.streamerId },
      order: [['createdAt', 'DESC']],
      limit: 10,
      include: [
        { model: User, as: 'donor', attributes: ['id', 'name', 'profilePicture'] },
        { model: User, as: 'streamer', attributes: ['id', 'name', 'profilePicture'] }
      ],
      attributes: [
        'id', 'donorId', 'streamerId', 'streamerName', 'amount', 'message', 'isAnonymous', 'date', 'createdAt', 'updatedAt'
      ]
    });
    // Mapear para incluir el nombre del donador
    const mapped = donations.map(d => ({
      id: d.id,
      donorId: d.donorId,
      donorName: d.isAnonymous ? 'Usuario Anónimo' : (d.donor?.name || 'Desconocido'),
      streamerId: d.streamerId,
      streamerName: d.streamerName,
      amount: d.amount,
      message: d.message,
      isAnonymous: d.isAnonymous,
      date: d.date,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt
    }));
    res.json(mapped);
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// FUNCIONALIDADES ADICIONALES
// Historial de donaciones de usuario
router.get('/:userId', async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { donorId: req.params.userId },
      include: [{ model: User, as: 'streamer' }]
    });
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;