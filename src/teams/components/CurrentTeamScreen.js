import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/components/Button';
import CreateTeamScreen from '../containers/CreateTeamScreen';
import SelectTeamScreen from './SelectTeamScreen';
import { RouteIndices } from './TeamNavigation';
import {
  InvertButton,
  InvertText,
  LIGHT_BLUE,
  X_AXIS_PADDING,
} from '../../shared';

export default class CurrentTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToCreateTeam = this._goToCreateTeam.bind(this);
    this._goToJoinTeam = this._goToJoinTeam.bind(this);
    this._goToChangeTeam = this._goToChangeTeam.bind(this);
    this._leaveTeam = this._leaveTeam.bind(this);
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
      return <InvertText style={styles.teamName}>{currentTeam['name']}</InvertText>;
    } else {
      return <InvertText style={styles.teamName}>Unassigned</InvertText>;
    }
  }

  render() {
    const createTeamButton = <InvertButton onPress={this._goToCreateTeam}>Create a Team</InvertButton>;
    const joinTeamButton = <InvertButton onPress={this._goToJoinTeam}>Join a Team</InvertButton>;
    const changeTeamButton = <InvertButton onPress={this._goToChangeTeam}>Change Team</InvertButton>;
    const leaveTeamButton = <InvertButton onPress={this._leaveTeam}>Leave team</InvertButton>;
    const hasJoinedTeam = !!this.props.currentTeam;
    return(
      <View style={styles.container}>
        <InvertText>TEAM</InvertText>
        {this._renderCurrentTeamName()}
        <View style={styles.buttonsContainer}>
          {!hasJoinedTeam && joinTeamButton}
          {createTeamButton}
          {hasJoinedTeam && changeTeamButton}
          {hasJoinedTeam && leaveTeamButton}
        </View>
      </View>
    );
  }
}

CurrentTeamScreen.propTypes = {
  currentTeam: PropTypes.any,
  leaveTeam: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 150,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: LIGHT_BLUE,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
  },
  teamName: {
    fontStyle: 'italic',
  }
});