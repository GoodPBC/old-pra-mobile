import React, { PropTypes } from 'react';
import { Image, StyleSheet } from 'react-native';
import checkedImage from './img/check-circle-outline.png';
import uncheckedImage from './img/checkbox-blank-circle-outline.png';

export default function Checkbox({ checked }) {
  return (
    <Image source={checked ? checkedImage : uncheckedImage} style={styles.image} />
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});