import { Application } from 'express';
import authRoutes from './auth.routes';
import tokenRoutes from './token.routes';
import userRoutes from './user.routes';

export default (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/token', tokenRoutes);
  app.use('/api/user', userRoutes);
};
