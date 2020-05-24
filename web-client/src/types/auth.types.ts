import { Sex, Role, User } from './user.types';
import { Driver } from './profile.types';

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

export type LoginResponse = {
  user: User;
  token: string;
  driver?: Driver;
};
