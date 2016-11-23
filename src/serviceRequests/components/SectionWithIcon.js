import React, { PropTypes } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  GRAY_TEXT,
  LIGHT_BLUE,
  X_AXIS_PADDING,
} from '../../shared';

export default function SectionWithIcon({ icon, header, children }) {
  return (
    <View style={styles.container}>
      <Image source={icon} />
      <View style={styles.content}>
        {header && <Text style={styles.header}>{header}</Text>}
        {children}
      </View>
    </View>
  );
}

SectionWithIcon.propTypes = {
  icon: PropTypes.any.isRequired,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: X_AXIS_PADDING,
  },
  header: {
    color: LIGHT_BLUE,
  },
  content: {
    paddingLeft: 10,
  },
  text: {
    color: GRAY_TEXT,
  },
});