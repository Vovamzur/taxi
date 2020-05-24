import { Driver, Car } from './../types/profile.types'
import callWebApi from 'helpers/webApiHelper'

export const updateCar = async (driverId: Driver['id'], car: Car): Promise<Car> => {
  const response = await callWebApi({
    endpoint: `/api/profile/car/${driverId}`,
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

