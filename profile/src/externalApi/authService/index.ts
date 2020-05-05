import authApi from './../../helpers/auth-api.helper';
import { User } from './models/User';
import { Driver } from 'models';
import { NextFunction } from 'express';

type VerifyToken = (token: string, next: NextFunction) => Promise<number|void>

export const verifyToken: VerifyToken = async (token, next) => {
  try {
    const statusCode = await authApi.post('/token/verify', { token }) as number;

    return statusCode;
  } catch (err) {
    return next({ status: 502, message: 'User service inaccessible' })
  }
}

type GetUSerById = (id: number, next: NextFunction) => Promise<User|void>;

export const getUserById: GetUSerById = async (id, next) => {
  try {
    const user = await authApi.get(`/user/${id}`) as User;

    return user;
  } catch (err) {
    return next({ status: 502, message: 'User service inaccessible' })
  }
}

type UpdateUserByID = (userID: Driver['userID'], user: User, next: NextFunction) => Promise<User|void>

export const updateUserById: UpdateUserByID = async (userId, user, next) => {
  try {
    const updatedUser = await authApi.put(`/user/${userId}`, user) as User;

    return updatedUser;
  } catch (err) {
    return next({ status: 502, message: 'User service inaccessible' })
  }
}
