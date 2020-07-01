'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WorkoutRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workoutName: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      intensity: {
        type: Sequelize.INTEGER
      },
      reps: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('WorkoutRecords');
  }
};