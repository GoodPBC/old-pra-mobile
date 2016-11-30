import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SelectTeamList from '../containers/SelectTeamList';
import { GradientBackground } from '../../shared';

import { RouteIndices } from './TeamNavigation';
import JoinTeamButton from './JoinTeamButton';

export default class SelectTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToDetail = this._goToDetail.bind(this);
    this._joinTeam = this._joinTeam.bind(this);
  }

  componentWillMount() {
    // Clear any pre-existing selection when we show this screen.
    this.props.selectTeam(null);
  }

  _goToDetail(team) {
    const route = {
      index: RouteIndices.USER_LIST,
      title: team.name,
      team,
    };
    this.props.navigator.push(route);
  }

  _joinTeam() {
    this.props.joinTeamAndProcessAssignments(this.props.selectedTeam);

    this.props.navigator.pop();
  }

  render() {
    return (
      <GradientBackground
        style={styles.container}>
        <ScrollView>
          <View style={styles.listContainer}>
            <SelectTeamList
              onViewTeamDetails={this._goToDetail}
            />
          </View>
          {this.props.selectedTeam && <JoinTeamButton joinTeam={this._joinTeam} />}
        </ScrollView>
      </GradientBackground>
    );
  }
}

SelectTeamScreen.propTypes = {
  joinTeamAndProcessAssignments: PropTypes.func.isRequired,
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