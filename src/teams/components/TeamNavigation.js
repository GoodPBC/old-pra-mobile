import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import CreateTeamScreen from '../containers/CreateTeamScreen';
import CurrentTeamScreen from '../containers/CurrentTeamScreen';
import SelectTeamScreen from '../containers/SelectTeamScreen';
import SelectTeamDetailScreen from '../containers/SelectTeamDetailScreen';
import { Navigation } from '../../shared';

export const RouteIndices = {
  CURRENT_TEAM: 0,
  TEAM_LIST: 1,
  USER_LIST: 2,
  CREATE_TEAM: 3,
};

export default class TeamNavigation extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
  }

  _renderScene(route, navigator) {
    let content = null;
    switch (route.index) {
      case RouteIndices.CURRENT_TEAM:
        content = <CurrentTeamScreen navigator={navigator} />;
        break;
      case RouteIndices.CREATE_TEAM:
        content = <CreateTeamScreen onFinish={() => navigator.pop()} />;
        break;
      case RouteIndices.TEAM_LIST:
        content = <SelectTeamScreen navigator={navigator} />;
        break;
      case RouteIndices.USER_LIST:
        content = <SelectTeamDetailScreen navigator={navigator} team={route.team} />;
        break;
      default:
        throw new Error('Invalid route provided');
    }
    return (
      <View style={styles.navAdjustment}>
        {content}
      </View>
    );
  }

  render() {
    const initialRoute = {
      title: 'Teams',
      index: 0,
    };
    return (
      <Navigation
        initialRoute={initialRoute}
        renderScene={this._renderScene}
        onBack={() => {}}
       />
    );
  }
}

TeamNavigation.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navAdjustment: {
    flex: 1,
    marginTop: 64,
  },
  navBar: {
    backgroundColor: 'lightgray',
  },
  navElement: {
    flex: 1,
    justifyContent: 'center',
  }
});