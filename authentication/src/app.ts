import express, { Application } from 'express';
import passport from 'passport';

import routes from './api/routes';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import authorizationMiddleware from './api/middlewares/authorization.middleware';
import routesWhiteList from './config/routes-white-list.config';
import './config/passport.config';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/', authorizationMiddleware(routesWhiteList));
routes(app);
app.use(errorHandlerMiddleware);

export default app;
