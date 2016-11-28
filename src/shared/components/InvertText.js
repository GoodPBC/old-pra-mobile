import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function InvertText(props) {
  const {
    style,
    ...rest
  } = props;
  return <Text style={[styles.text, style]} {...rest}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});