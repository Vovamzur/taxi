export enum Role {
  CLIENT,
  DRIVER,
  ADMIN,
}

export enum Sex {
  MALE,
  FEMALE
}

export type User = {
  id: number,
  role: Role,
  username: string,
  fio: string,
  sex: Sex,
  age: number,
  avatarUrl: string
}
