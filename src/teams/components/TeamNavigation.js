import React, { Component, PropTypes } from 'react';

import { Navigator, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import CreateTeamScreen from '../containers/CreateTeamScreen';
import CurrentTeamScreen from '../containers/CurrentTeamScreen';
import SelectTeamScreen from './SelectTeamScreen';
import SelectTeamDetailScreen from '../containers/SelectTeamDetailScreen';

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
    this._leftButton = this._leftButton.bind(this);
    this._rightButton = this._rightButton.bind(this);
    this._title = this._title.bind(this);
  }

  /**
   * Back button only on the details screen
   */
  _leftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <View style={styles.navElement}>
          <TouchableHighlight onPress={() => navigator.pop()}>
            <Text>Back</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return <View />;
    }
  }

  /**
   * Right button refreshes whichever screen you're on
   */
  _rightButton() {
    return (
      <View style={styles.navElement}>
        <TouchableHighlight onPress={() => console.log('TODO: Refresh')}>
          <Text>Refresh</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _title(route, navigator, index, navState) {
    return (
      <View style={styles.navElement}>
        <Text>{route.title}</Text>
      </View>
    );
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
        throw 'Invalid route provided';
    }
    return(
      <View style={styles.navAdjustment}>
        {content}
      </View>
    )
  }

  render() {
    const routeMapper = {
      LeftButton: this._leftButton,
      RightButton: this._rightButton,
      Title: this._title,
    };

    const initialRoute = {
      title: 'Teams',
      index: 0,
    };
    return (
      <Navigator
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={routeMapper}
          style={styles.navBar}
          />
        }
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