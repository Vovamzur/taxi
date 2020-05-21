export default (orm, DataTypes) => {
  const Order = orm.define(
    'order',
    {
      clientID: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'client',
          key: 'id'
        }
      },
      driverID: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'driver',
          key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('pending', 'submited', 'started', 'finished', 'canceled')
      },
      from: {
        allowNull: false,
        type: DataTypes.STRING
      },
      to: {
        allowNull: false,
        type: DataTypes.STRING
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      price: {
        allowNull: true,
        type: DataTypes.FLOAT
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {},
  );

  return Order;
};
