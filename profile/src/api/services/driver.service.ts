import { NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import driverRepository from './../../db/repositories/driver.repository';
import * as authService from './../../externalApi/authService'
import { FullDriver, Role } from './../../models';

type ServiceResult = Promise<FullDriver | void>

type GetDriverById = (id: FullDriver['id'], next: NextFunction) => ServiceResult

export const getDrivertById: GetDriverById = async (id, next) => {
  const driver = await getCustomRepository(driverRepository).findOne({ where: { id } });
  if (!driver) {
    return next({ status: 404, message: `There is no driver with such id: ${id}` });
  }
  const user = await authService.getUserById(driver.userID, next);
  if (user === undefined) return
  if (!user) {
    return next({ status: 404, message: `There is no user for driver` })
  }

  return { ...user, ...driver };
}

type CreateDriver = (driver: FullDriver, next: NextFunction) => ServiceResult

export const createDriver: CreateDriver = async (driver, next) => {
  const { username, fio, sex, age, role = Role.DRIVER } = driver;
  const userForUpdating = { username, fio, sex, age, role };
  const updatedUser = await authService.updateUserById(driver.userID, userForUpdating, next);
  if (updatedUser === undefined) return 
  if (!updatedUser) {
    return next({ status: 502, message: `can't update user` });
  }
  const newDriver = await getCustomRepository(driverRepository).save(driver);
  if (!newDriver) {
    return next({ status: 500, message: `can't create a new driver` });
  }
  const fullDriver = { ...updatedUser, ...newDriver };

  return fullDriver;
}

type UpdateDriver = (id: FullDriver['id'], driver: FullDriver, next: NextFunction) => ServiceResult

export const updateDriver: UpdateDriver = async (id, driver, next) => {
  const driverRepo = getCustomRepository(driverRepository)
  const dbDriver = await driverRepo.findOne({ where: { id } });
  if (!dbDriver) {
    return next({ status: 404, message: `There is no driver with such id: ${id}`})
  }
  await driverRepo.update(id, driver);
  const updatedDriver = await driverRepo.findOne({ where: { id } });
  if (!updatedDriver) {
    return next({ status: 500, message: `can't update driver` });
  }
  const { username, fio, sex, age } = driver;
  const userForUpdating = { username, fio, sex, age, role: Role.DRIVER };
  const updatedUser = await authService.updateUserById(driver.userID, userForUpdating, next);
  if (updatedUser === undefined) return
  if (!updatedUser) {
    return next({ status: 502, message: 'can`t update a user' });
  }
  const updatedFullDriver = { ...updatedUser, ...updatedDriver };

  return updatedFullDriver;
}
