export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.addColumn(
          'drivers',
          'userId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'drivers',
          'carId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'cars',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'orders',
          'clientId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'orders',
          'driverId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'drivers',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'orders',
          'from',
          {
            type: Sequelize.UUID,
            references: {
              model: 'coordinates',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'orders',
          'to',
          {
            type: Sequelize.UUID,
            references: {
              model: 'coordinates',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
        queryInterface.addColumn(
          'coordinates',
          'userId',
          {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        ),
      ]),
    ),
  down: (queryInterface) =>
    queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.removeColumn('drivers', 'carId', { transaction }),
        queryInterface.removeColumn('drivers', 'userId', { transaction }),
        queryInterface.removeColumn('orders', 'clientId', { transaction }),
        queryInterface.removeColumn('orders', 'driverId', { transaction }),
        queryInterface.removeColumn('orders', 'from', { transaction }),
        queryInterface.removeColumn('orders', 'to', { transaction }),
        queryInterface.removeColumn('orders', 'to', { transaction }),
        queryInterface.removeColumn('coordinates', 'userID', { transaction }),
      ]),
    ),
};
