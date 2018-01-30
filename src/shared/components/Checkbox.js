import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import checkedSquareImage from './img/multiple-select-button-active.png';
import uncheckedSquareImage from './img/multiple-select-button-inactive.png';

export default function Checkbox({ checked }) {
  return (
    <Image source={checked ? checkedSquareImage : uncheckedSquareImage} style={styles.image} />
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
