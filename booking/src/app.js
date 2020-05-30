import express from 'express';

import routes from './api/routes';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
app.use(errorHandlerMiddleware);

export default app;
