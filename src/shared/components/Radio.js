import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import checkedCircleImage from './img/select-radio-active.png';
import uncheckedCircleImage from './img/select-radio-inactive.png';
import checkedCircleImageOnBlue from './img/select-radio-active-on-blue.png';
import uncheckedCircleImageOnBlue from './img/select-radio-inactive-on-blue.png';

export default function Radio({ checked, blueBackground }) {
  let source;
  if (blueBackground) {
    source = checked ? checkedCircleImageOnBlue : uncheckedCircleImageOnBlue;
  } else {
    source = checked ? checkedCircleImage : uncheckedCircleImage;
  }

  return (
    <Image source={source} style={styles.image} />
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
