import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { InvertButton, X_AXIS_PADDING, BODY_BACKGROUND } from '../../shared';

export default function JoinTeamButton({ joinTeam }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <InvertButton onPress={joinTeam} withBorder>Join Team</InvertButton>
      </View>
    </View>
  );
}

JoinTeamButton.propTypes = {
  joinTeam: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingBottom: 40,
    paddingTop: 40,
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
  },
  container: {
    backgroundColor: BODY_BACKGROUND,
  },
});
