import React, { PropTypes } from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { DARK_BLUE } from '../constants';

export default function Button(props) {
  return (
    <TouchableHighlight
      style={[styles.container, props.style]}
      onPress={props.onPress}
      underlayColor={'gray'}
    >
      <View>
        <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
}

Button.propTypes = {
  style: View.propTypes.style,
  onPress: PropTypes.func.isRequired,
  textStyle: Text.propTypes.style,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARK_BLUE,
    borderColor: 'white',
    borderRadius: 6,
    height: 60,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});