import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class JoinTeamScreen extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Join a team</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});