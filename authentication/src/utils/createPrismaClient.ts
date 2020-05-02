import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const createPrismaClient = () => {
  return new PrismaClient();
};
