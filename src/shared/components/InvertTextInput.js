import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { LIGHT_BLUE } from '../constants';

export default function InvertTextInput(props) {
  const {
    style,
    ...rest,
  } = props;
  return <TextInput style={[props.style, styles.input]} placeholderTextColor="white" {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'white',
    borderRadius: 5,
    height: 60,
  }
});