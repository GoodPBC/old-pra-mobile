import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import ChangeTeamScreen from './ChangeTeamScreen';
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
      title: 'Join a Team',
    });
  }

  _goToChangeTeam() {
    this.props.navigator.push({
      component: ChangeTeamScreen,
      title: 'Change Team',
    });
  }

  _leaveTeam() {
    // TODO: Dispatch action to leave the team.
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
    const createTeamButton = <Button onPress={this._goToCreateTeam.bind(this)}>Create a Team</Button>;
    const joinTeamButton = <Button onPress={this._goToJoinTeam.bind(this)}>Join a Team</Button>;
    const changeTeamButton = <Button onPress={this._goToChangeTeam.bind(this)}>Change Team</Button>;
    const leaveTeamButton = <Button onPress={this._leaveTeam.bind(this)}>Leave team</Button>;
    const hasJoinedTeam = !!this.props.currentTeam;
    return(
      <View style={styles.container}>
        <Text>Current Team</Text>
        {this._renderCurrentTeamName()}
        {!hasJoinedTeam && createTeamButton}
        {!hasJoinedTeam && joinTeamButton}
        {hasJoinedTeam && changeTeamButton}
        {hasJoinedTeam && leaveTeamButton}
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