import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, LIGHT_BLUE, DARK_BLUE } from '../../shared';
import TeamUserList from '../containers/TeamUserList';
import JoinTeamButton from './JoinTeamButton';
import { GradientBackground } from '../../shared';

export default class SelectTeamDetailScreen extends Component {
  constructor(props){
    super(props);

    this._onJoinTeam = this._onJoinTeam.bind(this);
  }

  _onJoinTeam() {
    this.props.joinTeam(this.props.team);
    this.props.navigator.popToTop();
  }

  render() {
    return(
      <GradientBackground
        style={styles.container}>
        <View style={styles.listWrapper}>
          <TeamUserList team={this.props.team} />
        </View>
        <JoinTeamButton joinTeam={this._onJoinTeam} />
      </GradientBackground>
    );
  }
}

SelectTeamDetailScreen.propTypes = {
  joinTeam: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listWrapper: {
    flex: 1,
  }
});