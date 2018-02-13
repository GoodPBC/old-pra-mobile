import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function InvertTextInput(props) {
  const {
    style,
    ...otherProps
  } = props;

  return (
    <TextInput
      style={[style, styles.input]}
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    borderRadius: 5,
    height: 60,
    paddingLeft: 20,
    backgroundColor: 'rgba(105,174,222,0.3)',
  }
});
