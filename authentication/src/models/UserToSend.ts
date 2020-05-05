import { Role, SexType } from '@prisma/client';

export type UserToSend = {
  id: number;
  role: Role;
  username: string;
  fio?: string | null;
  sex?: SexType | null;
  age?: number | null;
  avatarUrl?: string | null;
};
