"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "profilePicture", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "/src/assets/default-avatar.svg"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "profilePicture");
  }
};
