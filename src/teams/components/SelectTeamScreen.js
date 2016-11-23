import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectTeamList from '../containers/SelectTeamList';
import { GradientBackground } from '../../shared';

import { RouteIndices } from './TeamNavigation';
import JoinTeamButton from './JoinTeamButton';

export default class SelectTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToDetail = this._goToDetail.bind(this);
  }

  _goToDetail(team) {
    const route = {
      index: RouteIndices.USER_LIST,
      title: team.name,
      team,
    };
    this.props.navigator.push(route);
  }

  render() {
    return (
      <GradientBackground
        style={styles.container}>
        <View style={styles.listContainer}>
          <SelectTeamList
            onViewTeamDetails={this._goToDetail}
          />
        </View>
        <JoinTeamButton joinTeam={() => this.props.joinTeam(this.props.selectedTeam) } />
      </GradientBackground>
    );
  }
}

SelectTeamScreen.propTypes = {
  joinTeam: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  selectedTeam: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listContainer: {
    borderTopWidth: 1,
    borderTopColor: 'white',
  }
});