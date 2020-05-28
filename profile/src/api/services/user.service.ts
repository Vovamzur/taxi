import { NextFunction } from 'express';

import knexConnection from './../../db/knexConnection';
import { User } from './../../externalApi/authService/models/User';

export const updateUser = async (userId: User['id'], user: User, next: NextFunction) => {
  const dbUser = await knexConnection<User>('users').where('id', '=', userId).first();
  if (!dbUser) {
    return next({ status: 404, message: `There is no user with such id: ${userId}` })
  }
  await knexConnection<User>('users').where('id', '=', userId).update(user);
  const updatedUser = await knexConnection<User>('users').where('id', '=', userId).first();
  if (!updatedUser) {
    return next({ status: 500, message: `can't update car` });
  }

  return updatedUser;
};
