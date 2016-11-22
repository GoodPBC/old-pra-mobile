import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { DARK_BLUE, LIGHT_BLUE } from '../constants';

export default function GradientBackground({ children, style }) {
  return (
      <LinearGradient
        colors={[DARK_BLUE, LIGHT_BLUE]}
        locations={[0,0.5]}
        style={style}>
        {children}
      </LinearGradient>
  );
}