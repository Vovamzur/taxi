import { Driver } from './Driver';

export type Car = {
  id: string;
  brand: string;
  number: string;
  color: string;
  year: Date;
  driver: Driver;
}
