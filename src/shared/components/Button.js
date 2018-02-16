import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { DARK_BLUE } from '../constants';

export default function Button(props) {
  const {
    disabled,
    disabledContainerStyle,
    style,
    textStyle,
    children,
    ...otherProps
  } = props;

  let disabledStyles = null;
  if (disabled) {
    if (disabledContainerStyle) {
      disabledStyles = disabledContainerStyle;
    } else {
      disabledStyles = styles.disabledContainer;
    }
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      style={[styles.container, style, disabledStyles]}
      underlayColor={'gray'}
      {...otherProps}
    >
      <View>
        <Text style={[styles.text, textStyle, disabled ? styles.disabledText : null]}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
}

Button.propTypes = {
  style: ViewPropTypes.style,
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
  disabledContainer: {
    backgroundColor: 'gray',
  },
  disabledText: {},
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
