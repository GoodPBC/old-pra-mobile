import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import OnsiteButton from './OnsiteButton';
import {
  DARK_BLUE,
  Separator,
} from '../../shared';

export default class OnsiteSection extends Component {


  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1)
    };
  }


  componentWillUnmount() {
    Animated.timing(
       this.state.fadeAnim,
       { toValue: 0 }
     ).start();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.fadeAnim }}>
        <OnsiteButton {...this.props} />
      </Animated.View>
    );
  }
}

styles = StyleSheet.create({
  banner: {
    backgroundColor: DARK_BLUE,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
});