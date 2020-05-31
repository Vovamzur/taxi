import { Coordinate } from './coodrinate.types';

export enum OrderStatus {
  NONE = 'none',
  PENDING = 'pending',
  SUBMITED = 'submited',
  STARTED = 'started',
  FINISHED = 'finshed',
  CANCELED = 'canceled',
};

export type OrderProps = {
  userId: string,
  from: Coordinate,
  to: Coordinate,
  clientSocketId: string,
};
