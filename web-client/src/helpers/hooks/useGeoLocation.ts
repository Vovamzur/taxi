import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { usePosition } from './usePosition';
import { RootState } from './../../store/types';
import { disconnectGeoLocation, sendLocation } from './../socket/geoLocation';
import { Coordinate } from 'types/coodrinate.types';

const LOCATION_DELAY = 10000;

export const useGeoLocation = (delay = LOCATION_DELAY): [Coordinate?, string?] => {
  const { user, isAuthorized } = useSelector((state: RootState) => state.profile);
  const [position, error] = usePosition();
  const savedCallback = useRef<null | NodeJS.Timeout>();

  useEffect(() => {
    if (!user || !position || error) return
    sendLocation(user.id, position)
    savedCallback.current = setInterval(() => {
      sendLocation(user.id, position)
    }, delay)

    return () => {
      user && disconnectGeoLocation(user.id)
      savedCallback.current && clearInterval(savedCallback.current);
    }
  }, [user, isAuthorized, delay, error, position])

  return [position, error];
};
