import React, { Component, PropTypes } from 'react';

import { Navigator, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import SyncScreen from '../components/SyncScreen';
import ServiceRequestDetailScreen from '../../serviceRequests/containers/ServiceRequestDetailScreen';

export default class SyncNavigation extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this._leftButton = this._leftButton.bind(this);
    this._rightButton = this._rightButton.bind(this);
    this._title = this._title.bind(this);

    this._refreshAndGoBack = this._refreshAndGoBack.bind(this);
  }

  _refreshAndGoBack(navigator) {
    navigator.pop();
  }

  /**
   * Back button only on the details screen
   */
  _leftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <View style={styles.navElement}>
          <TouchableHighlight onPress={() => this._refreshAndGoBack(navigator) }>
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
      <View style={styles.navElement} />
    );
  }

  _title(route, navigator, index, navState) {
    return (
      <View style={styles.navElement}>
        <Text>{route.title}</Text>
      </View>
    );
  }

  /**
   * 2 screens: My Requests and the details screen
   */
  _renderScene(route, navigator) {
    let content = null;
    if (route.index === 0) {
      content = <SyncScreen navigator={navigator} />;
    } else if (route.index === 1) {
      content = <ServiceRequestDetailScreen />;
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
      title: 'Sync',
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
          style={{backgroundColor: 'lightgray'}}
          />
        }
      />
    );
  }
}

SyncNavigation.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navAdjustment: {
    flex: 1,
    marginTop: 64,
  },
  navElement: {
    flex: 1,
    justifyContent: 'center',
  }
});