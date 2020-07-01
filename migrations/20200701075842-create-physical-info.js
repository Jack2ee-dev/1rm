'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PhysicalInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.DECIMAL
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      skeletalMuscleMass: {
        type: Sequelize.DECIMAL
      },
      bodyFatMass: {
        type: Sequelize.DECIMAL
      },
      bodyMasIndex: {
        type: Sequelize.DECIMAL
      },
      percentBodyFat: {
        type: Sequelize.DECIMAL
      },
      waistHipRatio: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PhysicalInfos');
  }
};