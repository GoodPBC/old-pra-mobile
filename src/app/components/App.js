import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert,
  AppState,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  View,
  NetInfo,
  Text,
} from 'react-native';
import titleCase from 'title-case';
import SelectTeamModal from '../../teams/containers/SelectTeamModal';
import { OfflineBanner } from '../../offline';
import { LoginScreen } from '../../user';
import { Tabs } from '../../shared';
import PushNotificationService from '../services/PushNotificationService';
import AppNavigator from './AppNavigator';

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabBarNavigator: {
    flex: 1,
  },
  tabBar: {
    shadowColor: '#333333',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8
  }
});

const getKeyByValue = (obj, val) => Object.keys(obj).find(key => obj[key] === val);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.trackUserPosition = this.trackUserPosition.bind(this);
    this.updateUserPosition = this.updateUserPosition.bind(this);
    this.registerToken = this.registerToken.bind(this);
    this._resetNavigation = this._resetNavigation.bind(this);
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(this.props.updateNetworkStatus);
    NetInfo.isConnected.addEventListener('connectionChange', this.props.updateNetworkStatus);
  }

  componentDidMount() {
    const screenName = titleCase(getKeyByValue(Tabs, this.props.selectedTab));
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

  registerToken(deviceToken) {
    this.props.updateDeviceInfo({ deviceToken });
  }

  handleNotification(notification) {
    if (AppState.currentState === 'active') {
      Alert.alert(
        'Sample Title',
        notification.message,
        [],
        { onDismiss: () => {} },
      );
    }
    console.log(notification);
  }

  trackUserPosition() {
    navigator.geolocation.getCurrentPosition(
      this.updateUserPosition,
      this.handleLocationServiceError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateUserPosition);
  }

  updateUserPosition(position) {
    this.props.updateUserPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: position.timestamp,
    });
  }

  handleLocationServiceError(error) {
    Alert.alert(JSON.stringify(error));
  }

  selectTab(selectedTab) {
    this.props.selectTab(selectedTab);
  }

  handlePress(selectedTab) {
    return () => this.selectTab(selectedTab);
  }

  _renderLogin() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType={'none'}
          style={{ zIndex: 1 }}
          transparent={false}
          visible={this.props.userIsAuthenticated !== true}
          onRequestClose={() => {}}
        >
          <LoginScreen {...this.props} />
        </Modal>
      </View>
    );
  }

  _renderTeamSelect() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType={'none'}
          transparent={false}
          visible
          onRequestClose={() => {}}
        >
          <SelectTeamModal {...this.props} resetNavigation={this._resetNavigation} />
        </Modal>
      </View>
    );
  }

  _resetNavigation() {
    this.props.selectTab(Tabs.MY_REQUESTS);
  }

  render() {
    if (!this.props.userIsAuthenticated) {
      return this._renderLogin();
    } else if (!this.props.hasSelectedTeam) {
      return this._renderTeamSelect();
    }

    return (
      <AppNavigator
        onTabBarPress={this.handlePress}
      />
    );
  }
}

App.propTypes = {
  apiRequestInProgress: PropTypes.bool.isRequired,
  clearErrorMessage: PropTypes.func.isRequired,
  gaTrackScreenView: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  updateNetworkStatus: PropTypes.func.isRequired,
  networkIsConnected: PropTypes.bool,
  userIsAuthenticated: PropTypes.bool,
};
