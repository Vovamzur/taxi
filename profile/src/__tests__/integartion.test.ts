import { expect } from 'chai';
import { stub, createSandbox } from 'sinon'
import request from 'supertest';
import typeorm from 'typeorm';
import { v4 as uuid } from 'uuid';

import app from './../app'
import * as authService from './../externalApi/authService';

describe('Profile editing endpoints', () => {
  before(() => {
    const stubVerifyToken = stub(authService, 'verifyToken').resolves({ statusCode: 200 });
  });

  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('car endpoinds', () => {
    let id;
    let car;

    before(() => {
      id = uuid()
      car = { id, brand: 'brand', number: 'number', color: 'color', year: new Date() }
    });

    describe('GET /api/car/:id', () => {
      it('should return car by id', async () => {

      });

      it('should return inavlid id error', () => {

      });


      it('should return there is no car with such id error', () => {

      });
    });

    describe('POST /api/car/', () => {
      it('should create car', () => {

      });

      it('should return inavlid body error', () => {

      });
    });

    describe('PUT /api/car/:id', () => {
      it('should update car', () => {

      });

      it('should return inavlid id error', () => {

      });

      it('should return inavlid body error', () => {

      });
    });
  });

  describe('profile endpoints', () => {
    describe('GET /api/profile/:id', () => {
      it('should return driver by id', () => {

      });

      it('should return inavlid id error', () => {

      });


      it('should return there is no driver with such id error', () => {

      });
    });

    describe('POST /api/profile/', () => {
      it('should create driver', () => {

      });

      it('should return inavlid body error', () => {

      });
    });

    describe('PUT /api/profile/:id', () => {
      it('should update sriver', () => {

      });

      it('should return inavlid id error', () => {

      });

      it('should return inavlid body error', () => {

      });
    });
  });
});
