import { Application } from 'express';
import driverRoutes from './driver.routes'
import carRoutes from './car.routes';

export default (app: Application) => {
  app.use('/api/profile', driverRoutes);
  app.use('/api/car', carRoutes)
};
