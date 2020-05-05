import jsonwebtoken from 'jsonwebtoken';
import { secret, expiresIn } from '../config/jwt.config';
import { User } from '@prisma/client';
import { promisify } from 'util';

const promisifyTokenVerify = promisify(jsonwebtoken.verify);

export default {
  createToken: ({ id }: { id: User['id'] }) => jsonwebtoken.sign({ id }, secret, { expiresIn }),
  verifyToken: async (token: string): Promise<boolean> => {
    try {
      const user = await promisifyTokenVerify(token, secret);
      return !!user;
    } catch (err) {
      return false;
    }
  },
};
