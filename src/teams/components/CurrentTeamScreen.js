import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/components/Button';
import CreateTeamScreen from '../containers/CreateTeamScreen';
import SelectTeamScreen from './SelectTeamScreen';
import { RouteIndices } from './TeamNavigation';
import { LIGHT_BLUE } from '../../shared';

export default class CurrentTeamScreen extends Component {
  constructor(props){
    super(props);
  }

  _goToCreateTeam() {
    this.props.navigator.push({
      index: RouteIndices.CREATE_TEAM,
      title: 'Create a Team',
    });
  }

  _goToJoinTeam() {
    this.props.navigator.push({
      index: RouteIndices.TEAM_LIST,
      title: 'Join a Team',
    });
  }

  _goToChangeTeam() {
    this.props.navigator.push({
      index: RouteIndices.TEAM_LIST,
      title: 'Change Team',
    });
  }

  _leaveTeam() {
    this.props.leaveTeam();
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
        {!hasJoinedTeam && joinTeamButton}
        {!hasJoinedTeam && createTeamButton}
        {hasJoinedTeam && changeTeamButton}
        {hasJoinedTeam && leaveTeamButton}
      </View>
    );
  }
}

CurrentTeamScreen.propTypes = {
  currentTeam: PropTypes.any,
  leaveTeam: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_BLUE,
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  }
});