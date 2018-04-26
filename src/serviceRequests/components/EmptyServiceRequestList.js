import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BODY_BACKGROUND } from '../../shared';

export default class EmptyServiceRequestList extends React.PureComponent {
  render() {
    const { type, currentTeam } = this.props;
    return (
      <View style={styles.container}>
        {
          type ? (
            <Text style={styles.text}>
              There are no {type} service requests for {currentTeam.name}.
            </Text>
          ) : (
            <Text style={styles.text}>
              There are no service requests for {currentTeam.name}.
            </Text>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: BODY_BACKGROUND
  },
  text: {
    textAlign: 'center'
  },
});
