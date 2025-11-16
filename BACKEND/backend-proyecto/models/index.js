const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('proyecto_pw', 'andrew', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = require('./User')(sequelize);
const Donation = require('./Donation')(sequelize);
const Product = require('./Product')(sequelize);

// Relaciones Usuario-Donación
User.hasMany(Donation, { foreignKey: 'donadorId', as: 'donationsMade' }); // Donaciones hechas por el usuario
User.hasMany(Donation, { foreignKey: 'streamerId', as: 'donationsReceived' }); // Donaciones recibidas por el usuario
Donation.belongsTo(User, { foreignKey: 'donadorId', as: 'donador' });
Donation.belongsTo(User, { foreignKey: 'streamerId', as: 'streamer' });

// Relación Usuario-Producto (si implementas compras)
// const Purchase = sequelize.define('Purchase', {});
// User.belongsToMany(Product, { through: Purchase, as: 'purchases' });
// Product.belongsToMany(User, { through: Purchase, as: 'buyers' });

module.exports = {
  sequelize,
  User,
  Donation,
  Product,
  // Purchase,
};
