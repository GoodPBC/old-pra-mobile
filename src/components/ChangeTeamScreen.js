import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './Button';
import SelectTeamList from '../containers/SelectTeamList';

export default class ChangeTeamScreen extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <SelectTeamList />
      </View>
    );
  }
}

ChangeTeamScreen.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});