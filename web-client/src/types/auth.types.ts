import { Sex, Role } from './user.types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  role: Role,
  email: string,
  fio: string,
  sex: Sex,
  age: number,
  password: string;
  avatarUrl?: string
};
