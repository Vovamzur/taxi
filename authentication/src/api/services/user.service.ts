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
  const { email } = data;
  const userWithSuchEmail = await prisma.user.findOne({ where: { email } });
  if (userWithSuchEmail && userWithSuchEmail.id !== id) {
    return next({ status: 400, message: `Email ${email} is already taken` });
  }
  const userFromDb = await prisma.user.findOne({ where: { id } });
  if (!userFromDb) {
    return next({ status: 400, message: `There is no user with such id ${id}` });
  }
  const user = await prisma.user.update({ data, where: { id } });
  const { password: _, ...userToSend } = user;

  return userToSend;
};
