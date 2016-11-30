import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, X_AXIS_PADDING } from '../../shared';

export default function JoinTeamButton({ joinTeam }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button onPress={joinTeam}>Join Team</Button>
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
    backgroundColor: 'lightgray',
  },
});
