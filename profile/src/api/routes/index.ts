import { Application } from 'express';
import driverRoutes from './driver.routes'
import carRoutes from './car.routes';
import userRoutes from './user.routes';

export default (app: Application) => {
  app.use('/api/profile/driver', driverRoutes);
  app.use('/api/profile/car', carRoutes);
  app.use('/api/profile/user', userRoutes);
};
