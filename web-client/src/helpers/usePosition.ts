import { useState, useEffect } from 'react';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const onChange: PositionCallback = ({ coords, timestamp }) => {
    setPosition({ coords, timestamp });
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
    settings.enableHighAccuracy,
    settings.timeout,
    settings.maximumAge
  ]);
  return [position, error];
};
