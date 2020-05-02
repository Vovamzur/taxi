import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
  encrypt: (data: string) => bcrypt.hash(data, saltRounds),
  encryptSync: (data: string) => bcrypt.hashSync(data, saltRounds),
  compare: (data: string, encrypted: string) => bcrypt.compare(data, encrypted),
};
