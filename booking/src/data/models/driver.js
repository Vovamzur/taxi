export default (orm, DataTypes) => {
  const Driver = orm.define(
    'driver',
    {
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      carId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'car',
          key: 'id'
        }
      },
      numberOfTrips: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      mark: {
        allowNull: true,
        type: DataTypes.FLOAT,
      }
    },
    {},
  );

  return Driver;
};
