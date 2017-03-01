import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { LIGHT_BLUE } from '../constants';

export default function InvertButton({ children, style, withBorder, ...props}) {
  let borderStyles = {};
  if (withBorder) {
    borderStyles = {
      borderWidth: 1,
      borderColor: LIGHT_BLUE,
    };
  }
  return <Button style={[styles.button, borderStyles, style]} textStyle={styles.text} {...props}>{children}</Button>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  text: {
    color: LIGHT_BLUE,
  }
});