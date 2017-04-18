import React, { Component, PropTypes } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  InvertButton,
  InvertText,
  GradientBackground,
  Navigation,
  Separator,
  LIGHT_BLUE,
  BODY_BACKGROUND,
  CARD_BORDER,
  X_AXIS_PADDING,
} from '../../shared';

import MapView from 'react-native-maps';

function MapScene() {
  return (
    <View style={styles.container}>
      <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
    </View>
  );
}

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }


  render() {
     const initialRoute = {
    title: 'Nearby Requests',
    index: 0,
    };

    return (
      <Navigation
        initialRoute={initialRoute}
        renderScene={() => <MapScene />}
        onBack={() => {}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BODY_BACKGROUND,
    flex: 1,
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    justifyContent: 'space-around',
  },
  modal: {
    backgroundColor: 'white',
  }
});