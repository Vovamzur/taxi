import { Driver } from './driver.type';

export enum Role {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export type LoginUser = {
  id: number,
  role: Role,
  email: string,
  fio: string,
  sex: Sex,
  age: number,
  avatarUrl?: string,
  driver?: Driver,
};

export type User = LoginUser & {
  password: string,
};

export type FullUser = LoginUser & {
  password: string,
};
