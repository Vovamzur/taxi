import { Role, Sex } from '../types/user.type';

export type UserToSend = {
  id: number;
  role: Role;
  email: string;
  fio?: string | null;
  sex?: Sex | null;
  age?: number | null;
  avatarUrl?: string | null;
};
