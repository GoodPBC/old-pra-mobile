import React, { PropTypes } from 'react';
import { Image, StyleSheet } from 'react-native';
import checkedCircleImage from './img/select-radio-active-on-blue.png';
import uncheckedCircleImage from './img/select-radio-inactive-on-blue.png';

export default function Radio({ checked }) {
  return (
    <Image source={checked ? checkedCircleImage : uncheckedCircleImage} style={styles.image} />
  );
}

Radio.propTypes = {
  checked: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});