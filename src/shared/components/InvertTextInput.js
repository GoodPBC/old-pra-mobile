import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function InvertTextInput(props) {
  const {
    style,
    ...rest,
  } = props;
  return <TextInput style={[style, styles.input]} placeholderTextColor="white" {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
  }
});