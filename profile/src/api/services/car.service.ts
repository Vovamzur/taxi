import { NextFunction } from 'express';

import knexConnection from '../../db/knexConnection';
import { Car } from '../../models'

type ServiceResult = Promise<Car | void>

type GetCarById = (id: Car['id'], next: NextFunction) => ServiceResult

export const getCarById: GetCarById = async (id, next) => {
  const car = await knexConnection<Car>('cars').where('id', '=', id).first();
  if (!car) {
    return next({ status: 404, message: `There is no car with such id: ${id}` })
  }

  return car;
}

type CreateCar = (car: Car, next: NextFunction) => ServiceResult

export const createCar: CreateCar = async (car, next) => {
  const [newCarId] = await knexConnection<Car>('cars')
    .returning('id')
    .insert(car);
  const newCar = knexConnection<Car>('cars').where('id', '=', newCarId).first();
  if (!newCar) {
    return next({ status: 500, message: `can't create a new car` });
  }

  return newCar;
}

type UpdateCar = (id: Car['id'], car: Car, next: NextFunction) => ServiceResult

export const updateCar: UpdateCar = async (id, car, next) => {
  const dbCar = await knexConnection<Car>('cars').where('id', '=', id).first();
  if (!dbCar) {
    return next({ status: 404, message: `There is no car with such id: ${id}` })
  }
  await knexConnection<Car>('cars').where('id', '=', id).update(car);
  const updatedCar = await knexConnection<Car>('cars').where('id', '=', id).first();
  if (!updatedCar) {
    return next({ status: 500, message: `can't update car` });
  }

  return updatedCar;
}
