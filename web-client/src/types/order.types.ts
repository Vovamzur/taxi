import { Coordinate } from './coodrinate.types';

export enum OrderStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  SUBMITED = 'SUBMITED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
};

export type OrderProps = {
  userId: string,
  from: Coordinate,
  to: Coordinate,
  clientSocketId: string,
};
