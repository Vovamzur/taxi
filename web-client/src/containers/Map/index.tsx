import React from 'react';

import { useGeoLocation } from 'helpers/hooks/useGeoLocation';

const Map = () => {
  const [position, error] = useGeoLocation();

  
  if (error) {
    return <div>{ error }</div>
  }

};

export default Map;
