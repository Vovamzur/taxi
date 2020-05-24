import { RequestHandler } from 'express';

import userSchema from './../../../validations/user.schema';

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  return typeof id === 'number'
    ? next()
    : next({ status: 400, message: `invalid fromat for id: ${id}` });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    await userSchema.validate(req.body, { strict: true });
    next();
  } catch ({ errors }) {
    const message = `Invalid body: ${Object.values(errors).join('\n')}`;
    return next({ message, status: 422 });
  }
};
