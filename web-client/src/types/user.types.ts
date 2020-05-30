export enum Role {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export type User = {
  id: string,
  role: Role,
  email: string,
  fio: string,
  sex: Sex,
  age: number,
  avatarUrl?: string
}
