import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import SyncScreen from '../components/SyncScreen';
import ServiceRequestDetailScreen from '../../serviceRequests/containers/ServiceRequestDetailScreen';
import { Navigation } from '../../shared';

export default class SyncNavigation extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
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
    return (
      <View style={styles.navAdjustment}>
        {content}
      </View>
    );
  }

  render() {
    const initialRoute = {
      title: 'Sync',
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
  },
});