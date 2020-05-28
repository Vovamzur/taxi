import { RequestHandler } from 'express';

import driverValidationSchema from '../../../validations/driver.validation';
import isUuidHelper from '../../../helpers/is-uuid.helper';

export const getByID: RequestHandler = async (req, res, next) => {
  const id = req.params.id as string;
  const isValidId = isUuidHelper(id);

  if (!isValidId) {
    const message = `Invalid uuid: ${id}`;
    return next({ message, status: 400 });
  }

  return next();
}

export const postDriver: RequestHandler = async (req, res, next) => {
  const { body } = req
  if (Object.keys(body).length === 0) {
    return next({ status: 422, message: 'Please, specify the body' });
  }
  try {
    await driverValidationSchema.validate(body, { strict: true });
  } catch ({ errors }) {
    const message = `Invalid body: ${Object.values(errors).join('\n')}`;
    return next({ message, status: 422 });
  }
  return next();
};

export const updateDriver: RequestHandler = (req, res, next) => {
  next()
  // return getByID(req, res, next) && postDriver(req, res, next);
};
