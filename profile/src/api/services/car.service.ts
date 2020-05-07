import { NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import carRepository from '../../db/repositories/car.repository';
import { Car } from '../../models'

type ServiceResult = Promise<Car | void>

type GetCarById = (id: Car['id'], next: NextFunction) => ServiceResult

export const getCarById: GetCarById = async (id, next) => {
  const car = await getCustomRepository(carRepository).findOne({ where: { id } });
  if (!car) {
    return next({ status: 404, message: `There is no car with such id: ${id}` })
  }

  return car;
}

type CreateCar = (car: Car, next: NextFunction) => ServiceResult

export const createCar: CreateCar = async (car, next) => {
  const newCar = await getCustomRepository(carRepository).save(car);
  if (!newCar) {
    return next({ status: 500, message: `can't create a new car` });
  }

  return newCar;
}

type UpdateCar = (id: Car['id'], car: Car, next: NextFunction) => ServiceResult

export const updateCar: UpdateCar = async (id, car, next) => {
  const carRepo = getCustomRepository(carRepository)
  const dbCar = await carRepo.findOne({ where: { id } });
  if (!dbCar) {
    return next({ status: 404, message: `There is no car with such id: ${id}` })
  }
  await carRepo.update(id, car);
  const updatedCar = await carRepo.findOne({ where: { id } });
  if (!updatedCar) {
    return next({ status: 500, message: `can't update car` });
  }

  return updatedCar;
}
