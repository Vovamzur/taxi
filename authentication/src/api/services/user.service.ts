import { NextFunction } from 'express';
import { User } from '@prisma/client';

import prisma from '../../db';
import { UserToSend } from './../../models/UserToSend';

type ServiceResult = Promise<UserToSend | void>;

type GetUserById = (id: User['id'], next: NextFunction) => ServiceResult;

export const getUserById: GetUserById = async (id, next) => {
  const user = await prisma.user.findOne({ where: { id } });
  if (!user) {
    return next({ status: 404, message: 'There is no user with such ID!' });
  }
  const { password: _, ...userToSend } = user;

  return userToSend;
};

type UpdateUserByID = (id: User['id'], data: User, next: NextFunction) => ServiceResult;

export const updateUserByID: UpdateUserByID = async (id, data, next) => {
  const { username } = data;
  const userWithSuchUsername = await prisma.user.findOne({ where: { username } });
  if (userWithSuchUsername && userWithSuchUsername.id !== id) {
    return next({ status: 400, message: `Username ${username} is already taken` });
  }
  const user = await prisma.user.update({ data, where: { id } });
  const { password: _, ...userToSend } = user;

  return userToSend;
};
