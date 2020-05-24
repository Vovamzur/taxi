export default (orm, DataTypes) => {
  const Car = orm.define(
    'car',
    {
      brand: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: DataTypes.STRING
      },
      year: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    },
    {},
  );

  return Car;
};
