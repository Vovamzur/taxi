import { Coordinate } from "../coordinates.type";

const DRIVER_RADIUS = 1000
const R = 6378137; // Earth’s mean radius in meter

const rad = (x: number): number => x * Math.PI / 180;

export const calculateDistance = (pos1: Coordinate, pos2: Coordinate): number => {
  const dLat = rad(pos2.latitude - pos1.latitude);
  const dLng = rad(pos2.longitude - pos1.longitude);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(pos1.latitude)) * Math.cos(rad(pos2.latitude)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
}

export const getInRadius = (drivers: Coordinate[], userPosition: Coordinate): Coordinate[] => {
  if (drivers.length === 0) return [];

  const activeDrivers = drivers.filter(driver => {
    const distance = calculateDistance(driver, userPosition);
    return distance < DRIVER_RADIUS;
  });

  if (activeDrivers.length > 0) {
    return activeDrivers;
  };

  const nearestDriver: Coordinate = drivers.reduce((nearest, cur) => {
    return calculateDistance(cur, userPosition) < calculateDistance(nearest, userPosition)
      ? cur
      : nearest
  }, drivers[0]);

  return [nearestDriver];
};
