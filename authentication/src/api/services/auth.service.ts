import { NextFunction } from 'express';

import { User, Role, LoginUser } from '../../types/user.type';
import { Driver } from './../../types/driver.type';
import knexConnection from './../../db/knexConnection';
import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';

type Login = (user: User, next: NextFunction) => Promise<{ user: LoginUser, token: string }>;

export const login: Login = async ({ password: _, ...user }, next) => {
  const driver = await knexConnection<Driver>('drivers').where('userId', '=', user.id).first()
  return {
    user: { ...user, driver },
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

  if (newUser.role === Role.DRIVER) {
    const [newDriverId] = await knexConnection<Driver>('drivers')
      .returning('id')
      .insert({ userId: newUserId });

    const newDriver = await knexConnection<Driver>('drivers').where('id', '=', newDriverId).first();

    if (!newDriver) {
      return next({ status: 500, message: `Can't regsiter user. Plese try again` });
    }
    return login({ ...newUser, driver: newDriver }, next);
  }

  return login(newUser, next);
};
