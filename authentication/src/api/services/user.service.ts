import { User } from '@prisma/client';
import prisma from '../../db';

export const getUserById = async (id: User['id']) => {
  const user = await prisma.user.findOne({ where: { id } });
  if (user === null) throw new Error('There is no user with such ID!');
  const { password: _, ...userToSend } = user;

  return userToSend;
};

export const updateUserByID = async (id: User['id'], data: User) => {
  try {
    const { username } = data;
    const userWithSuchUsername = await prisma.user.findOne({ where: { username } });
    if (userWithSuchUsername && userWithSuchUsername.id !== id) {
      throw new Error(`Username ${username} is already taken`);
    }
    const user: User = await prisma.user.update({ data, where: { id } });
    const { password: _, ...userToSend } = user;

    return userToSend;
  } catch (err) {
    throw err;
  }
};
