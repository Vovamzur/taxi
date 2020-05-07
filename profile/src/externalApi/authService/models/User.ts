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
  role: Role;
  username: string;
  fio: string;
  sex: SexType;
  age: number;
  avatarUrl?: string;
}
