const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stream = sequelize.define('Stream', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    config: {
      type: DataTypes.JSON
    },
    startTime: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'activo'
    },
    streamerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'streams',
    timestamps: false
  });
  return Stream;
};
