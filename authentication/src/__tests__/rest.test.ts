import request from 'supertest';
import { User } from '@prisma/client';

import app from '../app';
import prisma from '../db';
import cryptoHelper from '../helpers/crypto.helper';
import tokenHelper from '../helpers/token.helper';

describe('Auth endpoints', () => {
  let user: User;

  beforeAll(() => {
    user = {
      id: 1, role: 'CLIENT', email: 'email', password: 'password',
      fio: 'fio', sex: 'FEMALE', age: 11, avatarUrl: 'avatar',
    };
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

  describe('POST /api/auth/login', () => {
    it('should login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(user);
      const { status, body } = response;

      expect(status).toEqual(200);
      expect(body).toHaveProperty('user');
      expect(body).toHaveProperty('token');
    });

    it('should return `Incorrect Email.` error', async () => {
      prisma.user.findOne = jest.fn().mockResolvedValue(null);
      const userwithIncorrectEmail = { ...user, email: 'u' };

      const response = await request(app)
        .post('/api/auth/login')
        .send(userwithIncorrectEmail);
      const { status, body } = response;

      expect(status).toEqual(401);
      expect(body.message).toEqual('Incorrect email.');
    });

    it('should return `Wrong Password.` error', async () => {
      const userWithWrongPassword = { ...user, password: 'p' };

      const response = await request(app)
        .post('/api/auth/login')
        .send(userWithWrongPassword);
      const { status, body } = response;

      expect(status).toEqual(401);
      expect(body.message).toEqual('Wrong password.');
    });
  });

  describe('POST /api/auth/registration', () => {
    it('should return `Email is already taken.` error', async () => {
      const response = await request(app)
        .post('/api/auth/registration')
        .send(user);
      const { status, body } = response;

      expect(status).toEqual(401);
      expect(body.message).toEqual('Email is already taken.');
    });

    it('should register', async () => {
      prisma.user.findOne = jest.fn().mockResolvedValue(null);
      prisma.user.create = jest.fn().mockResolvedValue(user);

      const response = await request(app)
        .post('/api/auth/registration')
        .send(user);
      const { status } = response;

      expect(status).toEqual(200);
    });
  });

  describe('POST /api/token/verify', () => {

    it('should return 401 status code when token is empty', async () => {
      const response = await request(app)
        .post('/api/token/verify')
        .send({});
      const { status } = response;

      expect(status).toEqual(401);
    });

    it('should return 403 status code when token is invalid', async () => {
      const token = 'testtoken';

      const response = await request(app)
        .post('/api/token/verify')
        .send({ token });
      const { status } = response;

      expect(status).toEqual(403);
    });

    it('should return 200 status code', async () => {
      const testToken = 'Bearer testtoken';
      tokenHelper.verifyToken = jest.fn(async token => token === testToken.split(' ')[1]);

      const response = await request(app)
        .post('/api/token/verify')
        .send({ token: testToken });
      const { status } = response;

      expect(status).toEqual(200);
    });
  });

  describe('GET /api/user/:id', () => {
    let headers: { Authorization: string };

    beforeEach(async () => {
      cryptoHelper.compare = jest.fn(async (str1, str2) => str1 === str2);
      prisma.user.findOne = jest.fn().mockResolvedValue(user);
      const response = await request(app)
        .post('/api/auth/login')
        .send(user);
      const token = response.body.token;
      headers = { Authorization: `Bearer ${token}` };
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.resetModules();
    });

    it('should returns user', async () => {
      const response = await request(app)
        .get(`/api/user/${user.id}`)
        .set(headers);
      const { status, body } = response;

      expect(status).toEqual(200);
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('role');
      expect(body).toHaveProperty('email');
      expect(body).toHaveProperty('fio');
      expect(body).toHaveProperty('sex');
      expect(body).toHaveProperty('age');
      expect(body).not.toHaveProperty('password');
    });

    it('should returns `There is no user with such ID!` error', async () => {
      const invalidUserID = 123;
      prisma.user.findOne = jest.fn().mockImplementation(({ where: { id } }) => {
        return id === invalidUserID ? null : user;
      });

      const response = await request(app)
        .get(`/api/user/${invalidUserID}`)
        .set(headers);
      const { status, body } = response;

      expect(status).toEqual(404);
      expect(body.message).toEqual('There is no user with such ID!');
    });
  });

  describe('POST /api/user/update:id', () => {
    let headers: { Authorization: string };

    beforeEach(async () => {
      cryptoHelper.compare = jest.fn(async (str1, str2) => str1 === str2);
      prisma.user.findOne = jest.fn().mockResolvedValue(user);
      prisma.user.update = jest.fn().mockResolvedValue(user);
      const response = await request(app)
        .post('/api/auth/login')
        .send(user);
      const token = response.body.token;
      headers = { Authorization: `Bearer ${token}` };
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.resetModules();
    });

    it('should update user', async () => {
      const { password, ...expectedUser } = user;

      const response = await request(app)
        .put(`/api/user/update/${user.id}`)
        .set(headers)
        .send(user);
      const { status, body } = response;

      expect(status).toEqual(200);
      expect(body).toEqual(expectedUser);
    });

    it('should returns 400 status code when body is invaid', async () => {
      const response = await request(app)
        .put(`/api/user/update/${user.id}`)
        .set(headers)
        .send({ age: 'should be number' });
      const { status } = response;

      expect(status).toEqual(400);
    });
  });
});
