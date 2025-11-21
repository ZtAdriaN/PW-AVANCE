const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Streamer = sequelize.define('Streamer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    gems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    }
    ,
    streamingHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'HorasTotales'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pointsToNextLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    }
  }, {
    tableName: 'streamers',
    timestamps: false
  });

  return Streamer;
};