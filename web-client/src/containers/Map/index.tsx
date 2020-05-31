import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { feedback } from 'react-feedbacker';

import { Coordinate } from 'types/coodrinate.types';
import { useGeoLocation } from 'helpers/hooks/useGeoLocation';
import Spinner from 'components/Spinner';
import { RootState } from 'store/types';
import { bookTrip, setConditionalRideAsync, setConditionalRide, setDriverInfo, acceptOrder } from './actions';
import { notificationSocket } from 'helpers/socket/bookingSocket';
import { getSocketID } from 'helpers/socket/geoLocation';
import { ConditionaRide, DriverInfo } from './reducer';
import { OrderStatus } from 'types/order.types'

import carUrl from './car.png';
import userUrl from './user.png';
import taxiUrl from './taxi.png';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`
const DEFAULT_CENTER: Coordinate = { longitude: 27.7692977, latitude: 49.0351864 }
const DEFAULT_ZOOM = 10

const MapWithSearch = () => {
  const dispatch = useDispatch();
  const { activeDrivers, conditionalRide } = useSelector((state: RootState) => state.map);
  const { user } = useSelector((state: RootState) => state.profile);
  const [nulifyPosition, setFromPosition, setError, fromPosition = DEFAULT_CENTER, error] = useGeoLocation();
  const [detsinationPosition, setDestinationPositiion] = useState<Coordinate>();
  const mapCenter = new google.maps.LatLng(fromPosition.latitude, fromPosition.longitude)
  const [route, setRoute] = useState<google.maps.DirectionsResult>();
  const [conditionalRoute, setConditionalRoute] = useState<google.maps.DirectionsResult>();

  const onFromSelected = place => {
    if (place.name === '') {
      nulifyPosition()
    }
    if (!place.geometry) return
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    setFromPosition({ latitude, longitude })
  }

  const onDestinationSelected = place => {
    if (!place.geometry) return
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    setDestinationPositiion({ latitude, longitude })
  }

  const onUserMarkerDragEnd = e => {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();

    setFromPosition({ latitude, longitude })
  }

  const convertPosition = (position: Coordinate) => {
    return new google.maps.LatLng(position.latitude, position.longitude)
  }

  const bookTaxiRide = () => {
    if (!fromPosition || !detsinationPosition || !user?.id) {
      feedback.error('Please select from and destination addresses');
      return
    }

    dispatch(bookTrip({ userId: user.id, from: fromPosition, to: detsinationPosition }));
  }

  const submitOrder = () => {
    if (!conditionalRide || !user) return 
    const { newOrderId } = conditionalRide
    dispatch(setConditionalRide(null));
    const { fio } = user
    dispatch(acceptOrder({ orderId: newOrderId, driverSocketId: notificationSocket.id, fio }))
  }

  useEffect(() => {
    if (!detsinationPosition) return
    const DirectionsService = new google.maps.DirectionsService();
    const origin = convertPosition(fromPosition);
    const destination = convertPosition(detsinationPosition);
    const travelMode = google.maps.TravelMode.DRIVING

    DirectionsService.route({ origin, destination, travelMode }, (route, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setRoute(route)
      } else {
        setError(`error fetching directions ${route}`);
      }
    });
  }, [fromPosition, detsinationPosition]);

  useEffect(() => {
    if (!conditionalRide || !conditionalRide.from || !conditionalRide.to) return
    const DirectionsService = new google.maps.DirectionsService();
    const origin = convertPosition(conditionalRide.from);
    const destination = convertPosition(conditionalRide.to);
    const travelMode = google.maps.TravelMode.DRIVING

    DirectionsService.route({ origin, destination, travelMode }, (route, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setConditionalRoute(route)
      } else {
        setError(`error fetching directions ${route}`);
      }
    });
  }, [conditionalRide])

  useEffect(() => {
    notificationSocket.on(`${getSocketID()}new-order`, (conditionaRide: ConditionaRide) => {
      dispatch(setConditionalRideAsync(conditionaRide));
    });

    notificationSocket.on(`${notificationSocket.id}accept`, (driver: DriverInfo) => {
      dispatch(setDriverInfo(driver));
    })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={mapCenter}
    >
      {
        user?.role === 'CLIENT' ?
          <>
            <Autocomplete
              style={{
                position: 'absolute',
                width: '600px',
                height: '40px',
                paddingLeft: '16px',
                top: '140px',
                right: '20%'
              }}
              placeholder={'Enter from address'}
              onPlaceSelected={onFromSelected}
              types={['(regions)']}
            />
            <Autocomplete
              style={{
                position: 'absolute',
                width: '600px',
                height: '40px',
                paddingLeft: '16px',
                top: '180px',
                right: '20%'
              }}
              placeholder={'Enter destination address'}
              onPlaceSelected={onDestinationSelected}
              types={['(regions)']}
            />
            <Button
              style={{
                position: 'absolute',
                top: '220px',
                right: '20%'
              }}
              onClick={bookTaxiRide}
              disabled={!route}
              primary
            >
              Lets go
            </Button>
          </> : null
      }
      <Marker
        icon={{
          url: user?.role === 'DRIVER' ? taxiUrl : userUrl,
          scaledSize: new google.maps.Size(50, 50)
        }}
        draggable={user?.role === 'CLIENT'}
        onDragEnd={onUserMarkerDragEnd}
        position={{ lat: fromPosition.latitude, lng: fromPosition.longitude }}
      />
      {route && <DirectionsRenderer directions={route} />}
      {conditionalRoute && <DirectionsRenderer directions={conditionalRoute} />}
      {activeDrivers.map(({ longitude, latitude }) => (
        <Marker
          key={longitude + latitude}
          icon={{
            url: carUrl,
            scaledSize: new google.maps.Size(50, 50)
          }}
          draggable={false}
          position={{ lat: latitude, lng: longitude }}
        />
      ))}
      {conditionalRide
        ? <div
            style={{
              position: 'absolute',
              left: 20,
              bottom: 30,
              width: 200,
              height: 100,
              backgroundColor: 'white',
              zIndex: 5
            }}>
              <h3>New order</h3>
              <h4>{ conditionalRide.userFio }</h4>
            <Button
              primary
              onClick={submitOrder}
            >
              Submit
            </Button>
        </div>
        : null}
    </GoogleMap>
  )
}

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL,
    loadingElement: <Spinner />,
    containerElement: <div style={{ height: `790px`, width: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapWithSearch);

export default MapWithADirectionsRenderer;
