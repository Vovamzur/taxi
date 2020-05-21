export default (orm, DataTypes) => {
  const User = orm.define(
    'user',
    {
      role: {
        allowNull: false,
        type: DataTypes.ENUM('CLIENT', 'DRIVER', 'ADMIN'),
        default: 'CLIENT'
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      fio: {
        allowNull: true,
        type: DataTypes.STRING
      },
      sex: {
        allowNull: true,
        type: DataTypes.ENUM('MALE', 'FEMALE')
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      avatarUrl: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {},
  );

  return User;
};
