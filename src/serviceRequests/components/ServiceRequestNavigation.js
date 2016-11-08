import React, { Component, PropTypes } from 'react';

import { Navigator, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import MyRequestsScreen from '../containers/MyRequestsScreen';
import ServiceRequestDetailScreen from './ServiceRequestDetailScreen';

export default class ServiceRequestNavigation extends Component {
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
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text>Cancel</Text>
        </TouchableHighlight>
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
      <TouchableHighlight onPress={() => this.props.fetchServiceRequests()}>
        <Text>Refresh</Text>
      </TouchableHighlight>
    );
  }

  _title(route, navigator, index, navState) {
    return (
      <Text>{route.title}</Text>
    );
  }

  /**
   * 2 screens: My Requests and the details screen
   */
  _renderScene(route, navigator) {
    let content = null;
    if (route.index === 0) {
      content = <MyRequestsScreen navigator={navigator} />;
    } else if (route.index === 1) {
      content = <ServiceRequestDetailScreen serviceRequest={route.serviceRequest} />;
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
      title: 'My Requests',
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
  }
});