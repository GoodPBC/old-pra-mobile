import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InvertText(props) {
  const {
    style,
    ...rest
  } = props;
  return <Text style={[styles.text, props.style]} {...rest}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
});