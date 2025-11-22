const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GemTopup = sequelize.define('GemTopup', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'gem_topups',
    timestamps: false
  });
  return GemTopup;
};
