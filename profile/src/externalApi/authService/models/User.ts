export enum SexType {
  MALE,
  FEMALE,
};

export enum Role {
  CLIENT,
  DRIVER,
  ADMIN,
};

export type User = {
  id: string;
  role: Role;
  email: string;
  fio: string;
  sex: SexType;
  age: number;
  avatarUrl?: string;
}
