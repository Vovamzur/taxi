import { Car } from './Car';

export type Driver = {
  id: string;
  userID: number;
  car: Car;
  numberOfTrips: number;
  mark: number;
};
