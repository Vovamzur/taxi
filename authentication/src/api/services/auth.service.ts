import { User } from '../../types/user.type';

import knexConnection from './../../db/knexConnection';
import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';
import { NextFunction } from 'express';

export const login = async ({ password: _, ...user }: User, next: NextFunction) => {
  return {
    user,
    token: tokenHelper.createToken({ id: user.id }),
  };
};

export const register = async ({ password, ...userData }: User, next: NextFunction) => {
  const [newUserId] = await knexConnection<User>('users')
    .returning('id')
    .insert({ ...userData, password: await cryptoHelper.encrypt(password) });
  const newUser = await knexConnection<User>('users').where('id', '=', newUserId).first();
  if (!newUser) {
    return next({ status: 500, message: `Can't regsiter user. Plese try again` });
  }

  return login(newUser, next);
};
