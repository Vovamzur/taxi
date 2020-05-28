import { useState, useEffect } from 'react';

import { Coordinate } from 'types/coodrinate.types';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false, settings = defaultSettings): [Coordinate?, string?] => {
  const [position, setPosition] = useState<Coordinate>();
  const [error, setError] = useState<string>();
  
  const onChange: PositionCallback = ({ coords, timestamp }) => {
    const { longitude, latitude } = coords
    setPosition({ longitude, latitude });
  };
  const onError: PositionErrorCallback = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      return setError('Geolocation is not supported');
    }
    if (!watch) {
      navigator.geolocation.getCurrentPosition(onChange, onError, settings);
    }
    const watcher = watch ? navigator.geolocation.watchPosition(onChange, onError, settings) : null;
    return () => watcher ? navigator.geolocation.clearWatch(watcher): undefined;
  }, [
    watch,
    settings,
    settings.enableHighAccuracy,
    settings.timeout,
    settings.maximumAge
  ]);
  return [position, error];
};
