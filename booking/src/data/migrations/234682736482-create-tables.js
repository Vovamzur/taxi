export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;').then(() =>
      queryInterface.sequelize.transaction((transaction) =>
        Promise.all([
          queryInterface.createTable(
            'orders',
            {
              id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
              },
              clientID: {
                allowNull: false,
                type: Sequelize.INTEGER
              },
              driverID: {
                allowNull: false,
                type: Sequelize.STRING
              },
              status: {
                allowNull: false,
                type: Sequelize.ENUM('pending', 'submited', 'started', 'finished', 'canceled')
              },
              from: {
                allowNull: false,
                type: Sequelize.STRING
              },
              to: {
                allowNull: false,
                type: Sequelize.STRING
              },
              date: {
                allowNull: false,
                type: Sequelize.DATE
              },
              price: {
                allowNull: true,
                type: Sequelize.FLOAT
              },
              createdAt: {
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE,
              },
              updatedAt: {
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE,
              }
            },
            { transaction }
          )
        ])
      )
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.dropTable('orders', { transaction }),
      ]),
    ),
};
