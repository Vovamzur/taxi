export default (orm, DataTypes) => {
  const Coordinate = orm.define(
    'coordinate',
    {
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      longitude: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      latitude: {
        allowNull: false,
        type: DataTypes.FLOAT
      }
    },
    {},
  );

  return Coordinate;
};
