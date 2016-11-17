import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { DARK_BLUE } from '../constants';

export default function Button({ children, onPress }) {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor={'gray'}>
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARK_BLUE,
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    height: 60,
    paddingTop: 5,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});