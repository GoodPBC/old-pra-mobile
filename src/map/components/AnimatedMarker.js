import React, { PropTypes } from 'react';
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
import MapView from 'react-native-maps';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

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
  constructor(props) {
    super(props);
    // this.state = {
    //   scale: 2,
    // }
    // this.onPress = this.onPress.bind(this);
  }

  // onPress() {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  //   this.setState({ scale: this.state.scale === 2 ? 1 : 2 });
  //   // this.state.animatedValue.setValue(0.0001);
  //   // this.state.animatedValue.setValue(1.5);     // Start large
  //   // Animated.timing(                          // Base: spring, decay, timing
  //   //   this.state.animatedValue,                 // Animate `animatedValue`
  //   //   {
  //   //     toValue: 1,                         // Animate to smaller size
  //   //     duration: 3000,
  //   //     easing: Easing.bounce,
  //   //   }
  //   // ).start();
  // }

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
  unselectedMarker: {
    width: 20,
    height: 20,
    // flex: 1,
    position: 'absolute',
    top: 10,
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
  },
})
