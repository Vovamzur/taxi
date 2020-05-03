import { User } from '@prisma/client';
import prisma from '../../db';
import tokenHelper from '../../helpers/token.helper';
import cryptoHelper from '../../helpers/crypto.helper';

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
