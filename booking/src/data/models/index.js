import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Car = orm.import('./car');
const Driver = orm.import('./driver');
const Coordinate = orm.import('./coordinate');
const Order = orm.import('./order')

associate({ User, Car, Driver, Coordinate, Order });

export {
  User as UserModel,
  Car as CarModel,
  Driver as DriverModel,
  Coordinate as CoordinateModel,
  Order as OrderModel, 
};
