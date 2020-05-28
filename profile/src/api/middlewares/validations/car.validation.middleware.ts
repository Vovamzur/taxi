import { RequestHandler } from 'express';

import carValidationSchema from './../../../validations/car.validation';
import isUuidHelper from './../../../helpers/is-uuid.helper';

export const getByID: RequestHandler = async (req, res, next) => {
  const id = req.params.id as string;
  const isValidId = isUuidHelper(id);

  if (!isValidId) {
    const message = `Invalid uuid: ${id}`;
    return next({ message, status: 400 });
  }

  return next();
}

export const postCar: RequestHandler = async (req, res, next) => {
  const { body } = req
  if (Object.keys(body).length === 0) {
    return next({ status: 422, message: 'Sepcify body' })
  }
  try {
    await carValidationSchema.validate(body, { strict: true });
  } catch ({ errors }) {
    const message = `Invalid body: ${Object.values(errors).join('\n')}`;
    return next({ message, status: 422 });
  }
  return next();
};

export const updateCar: RequestHandler = (req, res, next) => {
  next()
  // return getByID(req, res, next) && postCar(req, res, next);
}
