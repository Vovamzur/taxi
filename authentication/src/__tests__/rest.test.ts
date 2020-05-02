import app from '../app';
import request from 'supertest';
import { prisma } from '../utils/createPrismaClient';
import { User } from '@prisma/client';
import cryptoHelper from '../helpers/crypto.helper';

describe('Auth endpoints', () => {
  let user: User;

  beforeAll(() => {
    user = { id: 1, username: 'username', password: 'password' };
  });

  beforeEach(() => {
    prisma.user.findOne = jest.fn().mockResolvedValue(user);
    prisma.user.create = jest.fn().mockResolvedValue(user);
    cryptoHelper.compare = jest.fn(async (str1, str2) => str1 === str2);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(user);
    const { status, body } = response;
    expect(status).toEqual(200);
    expect(body).toHaveProperty('user');
    expect(body).toHaveProperty('token');
  });

  it('should return Incorrect Username error', async () => {
    prisma.user.findOne = jest.fn().mockResolvedValue(null);
    const response = await request(app)
      .post('/api/auth/login')
      .send({ ...user, username: 'u' });
    const { status, body } = response;
    expect(status).toEqual(401);
    expect(body.message).toEqual('Incorrect username.');
  });

  it('should return Wrong Password error', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ ...user, password: 'p' });
    const { status, body } = response;
    expect(status).toEqual(401);
    expect(body.message).toEqual('Wrong password.');
  });

  it('should return Username is already taken error', async () => {
    const response = await request(app)
      .post('/api/auth/registration')
      .send(user);
    const { status, body } = response;
    expect(status).toEqual(401);
    expect(body.message).toEqual('Username is already taken.');
  });

  it('should register', async () => {
    prisma.user.findOne = jest.fn().mockResolvedValue(null);
    const response = await request(app)
      .post('/api/auth/registration')
      .send(user);
    const { status, body } = response;
    expect(status).toEqual(200);
  });
});
