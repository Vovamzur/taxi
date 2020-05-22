import { Sex } from './user.type';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ClientRegisterCredentials = {
  usernamename: string;
  password: string;
  fio: string;
  sex: Sex;
  age: number;
};
