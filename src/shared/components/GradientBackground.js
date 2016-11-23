import React, { PropTypes } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DARK_BLUE, LIGHT_BLUE } from '../constants';

export default function GradientBackground({ children, style }) {
  return (
      <LinearGradient
        colors={[DARK_BLUE, LIGHT_BLUE]}
        locations={[0, 0.5]}
        style={style}>
        {children}
      </LinearGradient>
  );
}

GradientBackground.propTypes = {
  children: PropTypes.node.isRequired,
  style: View.propTypes.style,
};