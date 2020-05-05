import { ErrorRequestHandler } from 'express';
import { CustomError } from './../../models';

const errorHandler: ErrorRequestHandler = (err: CustomError, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    const { status = 500, message = '' } = err;
    res.status(status).send({ status, message });
  }
};

export default errorHandler;
