import express, { Application } from 'express';

import routes from './api/routes';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import './config/passport.config';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use(errorHandlerMiddleware);

export default app;
