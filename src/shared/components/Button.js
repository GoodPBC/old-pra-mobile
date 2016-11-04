import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';

export default function Button({ children, onPress }) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingTop: 5,
    width: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
});