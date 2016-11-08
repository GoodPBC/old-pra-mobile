import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SelectTeamList from '../containers/SelectTeamList';
import SelectTeamDetailScreen from '../containers/SelectTeamDetailScreen';

import { RouteIndices } from './TeamNavigation';

export default class SelectTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToDetail = this._goToDetail.bind(this);
  }

  _goToDetail(team) {
    const route = {
      index: RouteIndices.USER_LIST,
      title: team['name'],
      team,
    };
    this.props.navigator.push(route);
  }

  render() {
    return(
      <View style={styles.container}>
        <SelectTeamList onSelectTeam={this._goToDetail} />
      </View>
    );
  }
}

SelectTeamScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});