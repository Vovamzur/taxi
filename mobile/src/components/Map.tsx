import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
});

export default () => (
  <MapView
    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    style={styles.map}
    region={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
  >
  </MapView>
);
