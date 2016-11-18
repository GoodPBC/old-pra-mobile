import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import { LIGHT_BLUE } from '../constants';

export default function InvertButton(props) {
  return <Button style={styles.button} textStyle={styles.text} {...props}>{props.children}</Button>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  text: {
    color: LIGHT_BLUE,
  }
});