import { Driver, Car } from './../types/profile.types'
import callWebApi from 'helpers/webApiHelper'

export const getCarById = async (carId: Car['id']): Promise<Car> => {
  const response = await callWebApi({
    endpoint: `/api/profile/car/${carId}`,
    type: 'GET',
  });

  return response.json();
};

export const createCar = async (car: Car): Promise<Car> => {
  const response = await callWebApi({
    endpoint: `/api/profile/car/`,
    type: 'POST',
    request: car
  });

  return response.json();
}

export const updateCar = async (carId: Car['id'], car: Car): Promise<Car> => {
  const response = await callWebApi({
    endpoint: `/api/profile/car/${carId}`,
    type: 'PUT',
    request: car
  });

  return response.json();
};

export const updateDriver = async (driverId: Driver['id'], driver: Driver): Promise<Driver> => {
  const response = await callWebApi({
    endpoint: `/api/profile/driver/${driverId}`,
    type: 'PUT',
    request: driver
  });

  return response.json();
};

