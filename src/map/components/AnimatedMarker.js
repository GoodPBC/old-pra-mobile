import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  Easing,
  View,
  Image,
  Text,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import mapMarkerGreen from './img/map-marker-green.png';
import mapMarkerYellow from './img/map-marker-yellow.png';
import mapMarkerRed from './img/map-marker-red.png';
import mapMarkerBlue from './img/map-marker-blue.png';

const MAP_MARKERS = {
  red: mapMarkerRed,
  yellow: mapMarkerYellow,
  green: mapMarkerGreen,
  blue: mapMarkerBlue,
};

export default class AnimatedMarker extends React.Component {
  render() {
    return (
        <Image source={MAP_MARKERS[this.props.color]} />
    )
  }
}

AnimatedMarker.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow', 'green', 'blue']),
};

const styles = StyleSheet.create({
})