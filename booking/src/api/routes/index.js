import orderRoutes from './order.routes';

export default (app) => {
  app.use('/api/order', orderRoutes);
};
