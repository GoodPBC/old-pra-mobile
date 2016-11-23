import React, { Component, PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';

import MyRequestsScreen from '../containers/MyRequestsScreen';
import ServiceRequestDetailScreen from '../containers/ServiceRequestDetailScreen';
import { LIGHT_BLUE, Navigation } from '../../shared';

export default class ServiceRequestNavigation extends Component {
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
      content = <MyRequestsScreen navigator={navigator} />;
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
      title: 'My Requests',
      index: 0,
    };
    return (
      <Navigation
        initialRoute={initialRoute}
        renderScene={this._renderScene}
        onBack={this.props.fetchServiceRequests}
        rightButtonAction={() => {}}
      />
    );
  }
}

ServiceRequestNavigation.propTypes = {
  fetchServiceRequests: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navAdjustment: {
    flex: 1,
    marginTop: 64,
  },
  navBar: {
    backgroundColor: LIGHT_BLUE,
  },
  navElement: {
    flex: 1,
    justifyContent: 'center',
  },
  navHeader: {
    color: 'white',
  }
});