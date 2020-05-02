import { Application } from 'express';
import authRoutes from './auth.routes';
import tokenRoutes from './token.routes';

export default (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/token', tokenRoutes);
};
