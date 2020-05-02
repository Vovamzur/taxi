import { prisma } from './../../utils/createPrismaClient';
import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';
import { User } from '@prisma/client';

export const login = async ({ password: _, ...user }: User) => {
  return {
    user,
    token: tokenHelper.createToken({ id: user.id }),
  };
};

export const register = async ({ password, ...userData }: User) => {
  const newUser = await prisma.user.create({
    data: {
      ...userData,
      password: await cryptoHelper.encrypt(password),
    },
  });

  return login(newUser);
};
