import { NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import knexConnection from '../../db/knexConnection';
import driverRepository from './../../db/repositories/driver.repository';
import * as authService from './../../externalApi/authService'
import { FullDriver, Role, Driver } from './../../models';

type ServiceResult = Promise<FullDriver | void>

type GetDriverById = (id: FullDriver['id'], next: NextFunction) => Promise<Driver | void>

export const getDrivertById: GetDriverById = async (id, next) => {
  const driver = await knexConnection<Driver>('drivers').where('id', '=', id).first();
  if (!driver) {
    return next({ status: 404, message: `There is no driver with such id: ${id}` });
  }
  // const { user, error } = await authService.getUserById(driver.userID);
  // if (error) return next(error)

  return driver;
  //  user && { ...user, ...driver }; 
}

type CreateDriver = (driver: FullDriver, next: NextFunction) => ServiceResult

export const createDriver: CreateDriver = async (driver, next) => {
  // const { email, fio, sex, age, role = Role.DRIVER } = driver;
  // const userForUpdating = { email, fio, sex, age, role };
  // const { updatedUser, error } = await authService.updateUserById(driver.userID, userForUpdating);
  // if (error) return next(error)
  // const newDriver = await getCustomRepository(driverRepository).save(driver);
  // if (!newDriver) {
  //   return next({ status: 500, message: `can't create a new driver` });
  // }
  // const fullDriver = { ...updatedUser, ...newDriver };

  // return fullDriver;
}

type UpdateDriver = (id: FullDriver['id'], driver: FullDriver, next: NextFunction) => Promise<Driver | void>

export const updateDriver: UpdateDriver = async (id, driver, next) => {
  const dbDriver = await knexConnection<Driver>('drivers').where('id', '=', id).first();
  if (!dbDriver) {
    return next({ status: 404, message: `There is no driver with such id: ${id}` })
  }
  await knexConnection<Driver>('drivers').where('id', '=', id).update(driver);
  const updatedDriver = await knexConnection<Driver>('drivers').where('id', '=', id).first();
  if (!updatedDriver) {
    return next({ status: 500, message: `can't update car` });
  }

  return updatedDriver;
  // const driverRepo = getCustomRepository(driverRepository)
  // const dbDriver = await driverRepo.findOne({ where: { id } });
  // if (!dbDriver) {
  //   return next({ status: 404, message: `There is no driver with such id: ${id}` })
  // }
  // await driverRepo.update(id, driver);
  // const updatedDriver = await driverRepo.findOne({ where: { id } });
  // if (!updatedDriver) {
  //   return next({ status: 500, message: `can't update driver` });
  // }
  // const { email, fio, sex, age } = driver;
  // const userForUpdating = { email, fio, sex, age, role: Role.DRIVER };
  // const { updatedUser, error } = await authService.updateUserById(driver.userID, userForUpdating);
  // if (error) return next(error)
  // const updatedFullDriver = updatedUser && { ...updatedUser, ...updatedDriver };

  // return updatedFullDriver;
}
