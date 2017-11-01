import React, { Component, PropTypes } from 'react';

import { Navigation } from '../../shared';

import MapScreen from '../containers/MapScreen';

export default function MapNavigation() {
  const initialRoute = {
    title: 'Nearby Requests',
    index: 0,
  };

  return (
    <Navigation
      initialRoute={initialRoute}
      renderScene={() => <MapScreen />}
      onBack={() => {}}
    />
  );
}
