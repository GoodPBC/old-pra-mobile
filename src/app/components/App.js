import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert,
  NetInfo,
} from 'react-native';
import SelectTeamModal from '../../teams/containers/SelectTeamModal';
import { OfflineBanner } from '../../offline';
import { LoginScreen } from '../../user';
import { Tabs } from '../../shared';
import PushNotificationService from '../services/PushNotificationService';
import AppNavigator from './AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.trackUserPosition = this.trackUserPosition.bind(this);
    this.updateUserPosition = this.updateUserPosition.bind(this);
    this.registerToken = this.registerToken.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(this.props.updateNetworkStatus);
    NetInfo.isConnected.addEventListener('connectionChange', this.props.updateNetworkStatus);
  }

  componentDidMount() {
    const screenName = this.props.selectedTab;
    this.props.gaTrackScreenView(screenName);
    this.trackUserPosition();    
    PushNotificationService.init(
      this.registerToken,
      this.handleNotification,
    );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage) {
      const title = newProps.errorTitle || 'Error';
      Alert.alert(title, newProps.errorMessage, [
        { text: 'OK', onPress: this.props.clearErrorMessage },
      ]);
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.props.updateNetworkStatus);
    navigator.geolocation.clearWatch(this.watchID);
  }

  onLayout(e) {
    const { width, height } = e.nativeEvent.layout;
    this.props.updateDeviceInfo({
      width,
      height,
      orientation: height >= width ? 'portrait' : 'landscape',
    });
  }

  onNavigationStateChange(prevState, currentState) {
    const screenName = this.getCurrentRouteName(currentState);
    this.props.gaTrackScreenView(screenName);
    this.props.selectTab(screenName);
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }

    const { index, routes } = navigationState;
    return routes[index].routeName;
  }

  handleLocationServiceError(error) {
    Alert.alert(JSON.stringify(error));
  }

  updateUserPosition(position) {
    this.props.updateUserPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: position.timestamp,
    });
  }

  trackUserPosition() {
    navigator.geolocation.getCurrentPosition(
      this.updateUserPosition,
      this.handleLocationServiceError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateUserPosition);
  }

  handleNotification(notification) {
    const { userAccountName } = this.props;
    this.props.gaTrackEvent(
      'Push Notifications',
      'Received',
      userAccountName || 'Unknown User'
    );
  }

  registerToken({ token, os }) {
    this.props.gaTrackEvent(
      'Push Notifications',
      'Registered'
    );
    this.props.updateDeviceInfo({
      deviceToken: token,
      os,
    });
  }

  render() {
    if (!this.props.userIsAuthenticated) {
      return <LoginScreen />;
    } else if (!this.props.hasSelectedTeam) {
      return <SelectTeamModal />;
    } else {
      return (
        <AppNavigator
          onNavigationStateChange={this.onNavigationStateChange}
        />
      )
    }
  }
}

App.propTypes = {
  apiRequestInProgress: PropTypes.bool.isRequired,
  clearErrorMessage: PropTypes.func.isRequired,
  gaTrackEvent: PropTypes.func.isRequired,
  gaTrackScreenView: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  updateNetworkStatus: PropTypes.func.isRequired,
  networkIsConnected: PropTypes.bool,
  userIsAuthenticated: PropTypes.bool,
};
