import React, { Component } from 'react';
import { Animated } from 'react-native';
import OnsiteButton from './OnsiteButton';

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