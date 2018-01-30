import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GradientBackground } from '../../shared';
import TeamUserList from '../containers/TeamUserList';
import JoinTeamButton from './JoinTeamButton';

export default class SelectTeamDetailScreen extends Component {
  constructor(props){
    super(props);

    this._onJoinTeam = this._onJoinTeam.bind(this);
  }

  _onJoinTeam() {
    // TODO: add current team as second param if it's changing team.
    this.props.joinTeam(this.props.team);
    this.props.navigator.popToTop();
  }

  render() {
    return (
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
