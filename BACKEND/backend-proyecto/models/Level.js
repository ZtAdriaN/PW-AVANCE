const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Level = sequelize.define('Level', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    achievedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'levels',
    timestamps: false
  });
  return Level;
};
