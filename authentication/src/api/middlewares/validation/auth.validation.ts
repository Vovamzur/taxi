import { RequestHandler } from 'express';

import loginSchema from './../../../validations/login.schema';
import registrationSchema from '../../../validations/registration.schema';

export const login: RequestHandler = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { strict: true });
    next();
  } catch ({ errors }) {
    const message = `Invalid body: ${Object.values(errors).join('\n')}`;
    return next({ message, status: 422 });
  }
};

export const registration: RequestHandler = async (req, res, next) => {
  try {
    await registrationSchema.validate(req.body, { strict: true });
    next();
  } catch ({ errors }) {
    const message = `Invalid body: ${Object.values(errors).join('\n')}`;
    return next({ message, status: 422 });
  }
};
