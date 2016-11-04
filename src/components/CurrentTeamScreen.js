import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import CreateTeamScreen from '../containers/CreateTeamScreen';
import JoinTeamScreen from './JoinTeamScreen';

export default class CurrentTeamScreen extends Component {
  constructor(props){
    super(props);
  }

  _goToCreateTeam() {
    this.props.navigator.push({
      component: CreateTeamScreen,
      title: 'Create a Team',
      passProps: {
        onFinish: this._goBackToCurrentTeam.bind(this)
      },
    });
  }

  _goToJoinTeam() {
    this.props.navigator.push({
      component: JoinTeamScreen,
      title: 'Create a Team',
    });
  }

  _goBackToCurrentTeam() {
    this.props.navigator.pop();
  }

  _renderCurrentTeamName() {
    const { currentTeam } = this.props;
    if (currentTeam) {
      return <Text>{currentTeam['name']}</Text>;
    } else {
      return <Text>Unassigned</Text>;
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Current Team</Text>
        {this._renderCurrentTeamName()}
        <Button onPress={this._goToCreateTeam.bind(this)}>Create a Team</Button>
        <Button onPress={this._goToJoinTeam.bind(this)}>Join a Team</Button>
      </View>
    );
  }
}

CurrentTeamScreen.propTypes = {
  currentTeam: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});