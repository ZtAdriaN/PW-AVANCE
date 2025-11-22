const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('proyecto_pw', 'andrew', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = require('./User')(sequelize);
const Donation = require('./Donation')(sequelize);
const Product = require('./Product')(sequelize);
const Category = require('./Category')(sequelize);
const Stream = require('./Stream')(sequelize);
const Purchase = require('./Purchase')(sequelize);
const ChatMessage = require('./ChatMessage')(sequelize);
const GemTopup = require('./GemTopup')(sequelize);
const Level = require('./Level')(sequelize);


// Relaciones Usuario-Donación
User.hasMany(Donation, { foreignKey: 'donorId', as: 'donationsMade' });
User.hasMany(Donation, { foreignKey: 'streamerId', as: 'donationsReceived' });
Donation.belongsTo(User, { foreignKey: 'donorId', as: 'donor' });
Donation.belongsTo(User, { foreignKey: 'streamerId', as: 'streamer' });

// Relación Usuario-Producto-Compra
User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });
Product.hasMany(Purchase, { foreignKey: 'productId', as: 'productPurchases' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'buyer' });
Purchase.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Relación Producto-Categoría
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Relación Usuario-Stream
User.hasMany(Stream, { foreignKey: 'streamerId', as: 'streams' });
Stream.belongsTo(User, { foreignKey: 'streamerId', as: 'streamer' });

// Relación Stream-ChatMessage y Usuario-ChatMessage
Stream.hasMany(ChatMessage, { foreignKey: 'streamId', as: 'chatMessages' });
User.hasMany(ChatMessage, { foreignKey: 'userId', as: 'userMessages' });
ChatMessage.belongsTo(Stream, { foreignKey: 'streamId', as: 'stream' });
ChatMessage.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relación Usuario-Nivel
User.hasMany(Level, { foreignKey: 'userId', as: 'levels' });
Level.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Donation,
  Product,
  Category,
  Stream,
  Purchase,
  ChatMessage,
  GemTopup,
  Level,
};
