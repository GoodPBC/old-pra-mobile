import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import SelectTeamList from '../containers/SelectTeamList';
import { LIGHT_BLUE, BODY_BACKGROUND } from '../../shared';

import JoinTeamButton from './JoinTeamButton';

export default class SelectTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToDetail = this._goToDetail.bind(this);
    this._joinTeam = this._joinTeam.bind(this);
  }

  _goToDetail(team) {
    // const route = {
    //   index: RouteIndices.USER_LIST,
    //   title: team.name,
    //   team,
    // };
    // this.props.navigator.push(route);
  }

  _joinTeam() {
    const { selectedTeam, currentTeam, isModal } = this.props;
    this.props.joinTeam(selectedTeam, currentTeam);

    if (!isModal) {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View
        style={styles.container}>
        <ScrollView>
          <View style={styles.listContainer}>
            <SelectTeamList
              onViewTeamDetails={this._goToDetail}
            />
          </View>
          {this.props.selectedTeam && <JoinTeamButton joinTeam={this._joinTeam} />}
        </ScrollView>
      </View>
    );
  }
}

SelectTeamScreen.propTypes = {
  joinTeam: PropTypes.func.isRequired,
  isModal: PropTypes.bool,
  selectedTeam: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BODY_BACKGROUND,
  },
  listContainer: {
    borderTopWidth: 1,
    borderTopColor: 'white',
  }
});
