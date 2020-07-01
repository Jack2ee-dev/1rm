'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      targetPartEng: {
        type: Sequelize.STRING
      },
      targetPartKor: {
        type: Sequelize.STRING
      },
      targetMuscleEng: {
        type: Sequelize.STRING
      },
      targetMuscleKor: {
        type: Sequelize.STRING
      },
      workoutNameEng: {
        type: Sequelize.STRING
      },
      workoutNameKor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Workouts');
  }
};