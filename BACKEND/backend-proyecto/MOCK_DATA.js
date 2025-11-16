// Script para poblar la base de datos con datos de ejemplo usando Sequelize
const { sequelize, User, Product, Donation } = require('./models');
const bcrypt = require('bcrypt');

async function seed() {
  await sequelize.sync({ force: true }); // Borra y recrea las tablas


  // Usuarios
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push(await User.create({
      username: `user${i}`,
      email: `user${i}@email.com`,
      password: await bcrypt.hash(`pass${i}`, 10),
      profilePicture: '',
      role: i === 10 ? 'admin' : (i % 3 === 0 ? 'streamer' : 'user'),
      gems: 100 * i,
      level: i,
      points: 10 * i,
      pointsToNextLevel: 100 * i
    }));
  }

  // Productos
  const products = [];
  for (let i = 1; i <= 10; i++) {
    products.push(await Product.create({
      name: `Producto${i}`,
      description: `Descripción del producto ${i}`,
      price: 10 * i,
      image: '',
      type: i % 2 === 0 ? 'accesorio' : 'ropa'
    }));
  }

  // Donaciones
  for (let i = 1; i <= 10; i++) {
    await Donation.create({
      donorId: users[i % users.length].id,
      streamerId: users[(i + 1) % users.length].id,
      amount: 5 * i,
      message: `Donación número ${i}`,
      isAnonymous: i % 2 === 0
    });
  }

  console.log('Datos de ejemplo insertados correctamente');
  process.exit();
}

seed();
