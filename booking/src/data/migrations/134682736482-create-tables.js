export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;').then(() =>
      queryInterface.sequelize.transaction((transaction) =>
        Promise.all([
          queryInterface.createTable(
            'users',
            {
              id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
              },
              role: {
                allowNull: false,
                type: Sequelize.ENUM('CLIENT', 'DRIVER', 'ADMIN'),
                default: 'CLIENT'
              },
              username: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
              },
              password: {
                allowNull: false,
                type: Sequelize.STRING
              },
              fio: {
                allowNull: true,
                type: Sequelize.STRING
              },
              sex: {
                allowNull: true,
                type: Sequelize.ENUM('MALE', 'FEMALE')
              },
              age: {
                allowNull: true,
                type: Sequelize.INTEGER
              },
              avatarUrl: {
                allowNull: true,
                type: Sequelize.STRING
              }
            },
            { transaction }
          ),

          queryInterface.createTable(
            'cars',
            {
              id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
              },
              brand: {
                allowNull: false,
                type: Sequelize.STRING,
              },
              number: {
                allowNull: false,
                type: Sequelize.STRING
              },
              year: {
                allowNull: true,
                type: Sequelize.DATE
              }
            },
            { transaction }
          ),
          queryInterface.createTable(
            'drivers',
            {
              id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
              },
              numberOfTrips: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
              },
              mark: {
                allowNull: true,
                type: Sequelize.FLOAT,
              }
            },
            { transaction }
          ),
          queryInterface.createTable(
            'coordinates',
            {
              id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
              },
              longitude: {
                allowNull: false,
                type: Sequelize.FLOAT
              },
              latitude: {
                allowNull: false,
                type: Sequelize.FLOAT
              }
            },
            { transaction }
          ),
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
              status: {
                allowNull: false,
                type: Sequelize.ENUM('pending', 'submited', 'started', 'finished', 'canceled')
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
        queryInterface.dropTable('users', { transaction }),
        queryInterface.dropTable('cars', { transaction }),
        queryInterface.dropTable('drivers', { transaction }),
        queryInterface.dropTable('coordinates', { transaction }),
        queryInterface.dropTable('orders', { transaction }),
      ]),
    ),
};
