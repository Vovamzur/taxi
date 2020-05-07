import { expect } from 'chai';
import { stub } from 'sinon'
import request from 'supertest';

import * as authService from './../externalApi/authService';
import { Car } from 'models';

describe('Profile editing endpoints', () => {

  before(() => {
    const stubVerifyToken = stub(authService, 'verifyToken').resolves({ statusCode: 200 });
  });

  describe('car endpoinds', () => {
    let car: Car;

    before(() => {
      car = { brand: 'brand', number: 'number', color: 'color', year: new Date() }
    });

    describe('GET /api/car/:id', () => {
      it('should return car by id', () => {

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
