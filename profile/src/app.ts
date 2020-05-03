import express, { Application } from 'express';

import routes from './api/routes';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import authorizationMiddleware from './api/middlewares/authorization.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorizationMiddleware);
routes(app);
app.use(errorHandlerMiddleware);

export default app;
