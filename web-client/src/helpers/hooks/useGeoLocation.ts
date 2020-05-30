import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { usePosition, UseLocation } from './usePosition';
import { RootState } from 'store/types';
import { disconnectGeoLocation, sendLocation, getNearestDrivers } from '../socket/geoLocation';
import { Coordinate } from 'types/coodrinate.types'

const LOCATION_DELAY = 20000;
const RANDOM_DELAY = 100000;

const randomizeDriverPosition = (position: Coordinate): Coordinate => ({
  longitude: position.longitude + (Math.round(Math.random()) * 2 - 1) * Math.random() / 20,
  latitude: position.latitude + (Math.round(Math.random()) * 2 - 1) * Math.random() / 20
})

export const useGeoLocation = (delay = LOCATION_DELAY): UseLocation => {
  const { user, isAuthorized } = useSelector((state: RootState) => state.profile);
  const [nulifyPosition, setPosition, setError, position, error] = usePosition();
  const savedCallback = useRef<NodeJS.Timeout>();
  const randomCallback = useRef<NodeJS.Timeout>();

  const geoTick = () => {
    if (!user || !position || error) return
    if (user.role === 'DRIVER') {
      sendLocation(user.id, position)
    }
    getNearestDrivers(user.id, position)
  }

  useEffect(() => {
    geoTick();
    savedCallback.current = setInterval(geoTick, delay)

    return () => {
      user && disconnectGeoLocation(user.id)
      savedCallback.current && clearInterval(savedCallback.current);
    }
  }, [
    user,
    isAuthorized,
    delay,
    error,
    position
  ]);

  useEffect(() => {
    randomCallback.current = setInterval(() => {
      setPosition(position => {
        if (!position || user?.role !== 'DRIVER') return
        const newPosition = randomizeDriverPosition(position)
        return newPosition
      })
    }, RANDOM_DELAY);

    return () => {
      randomCallback.current && clearInterval(randomCallback.current)
    }
  }, [])

  return [nulifyPosition, setPosition, setError, position, error];
};
