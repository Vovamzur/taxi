import { prisma } from '../../utils/createPrismaClient';
import { User } from '@prisma/client';

export const getUserById = async (userId: User['id']) => {
  const user = await prisma.user.findOne({ where: { id: userId } });
  if (user === null) throw new Error('There is no user with such ID!');
  const { password: _, ...userToSend } = user;

  return userToSend;
};
