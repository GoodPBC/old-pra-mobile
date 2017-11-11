import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { LIGHT_BLUE, LIGHT_GRAY } from '../constants';

export default function InvertButton({ children, disabled, style, withBorder, ...props }) {
  const buttonStyle = [
    styles.button,
    withBorder ? styles.buttonBorder : {},
    style
  ];
  const textStyle = disabled ? styles.disabledText : styles.text;

  return (
    <Button
      disabledContainerStyle={styles.disabledContainer}
      style={buttonStyle}
      textStyle={textStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: LIGHT_BLUE,
  },
  disabledContainer: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
  },
  text: {
    color: LIGHT_BLUE,
  },
  disabledText: {
    color: 'rgba(150, 150, 150, 0.5)',
  }
});
