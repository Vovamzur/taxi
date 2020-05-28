import { NextFunction } from 'express';

import { User } from '../../types/user.type';
import knexConnection from '../../db/knexConnection';
import { UserToSend } from './../../models/UserToSend';
import { Driver } from '../../types/driver.type';

type ServiceResult = Promise<UserToSend | void>;

type GetUserById = (id: User['id'], next: NextFunction) => ServiceResult;

export const getUserById: GetUserById = async (id, next) => {
  const user = await knexConnection<User>('users').where('id', '=', id).first();
  if (!user) {
    return next({ status: 404, message: 'There is no user with such ID!' });
  }
  const driver = await knexConnection<Driver>('drivers').where('userId', '=', user.id).first();
  const { password: _, ...userToSend } = user;

  return { ...userToSend, driver };
};

type UpdateUserByID = (id: User['id'], data: User, next: NextFunction) => ServiceResult;

export const updateUserByID: UpdateUserByID = async (id, data, next) => {
  const { email } = data;
  const userWithSuchEmail = await knexConnection<User>('users').where('email', '=', email).first();
  if (userWithSuchEmail && userWithSuchEmail.id !== id) {
    return next({ status: 400, message: `Email ${email} is already taken` });
  }
  const userFromDb = await knexConnection<User>('users').where('id', '=', id).first();
  if (!userFromDb) {
    return next({ status: 400, message: `There is no user with such id ${id}` });
  }
  await knexConnection<User>('users').where('id', '=', id).update(data);
  const user = await knexConnection<User>('users').where('id', '=', id).first();

  if (!user) {
    return next({ status: 400, message: `There is no user with such id ${id}` });
  }

  const { password: _, ...userToSend } = user;

  return userToSend;
};
