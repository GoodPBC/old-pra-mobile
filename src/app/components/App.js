import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  View,
  NetInfo,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import titleCase from 'title-case';

import { ServiceRequestNavigation } from '../../serviceRequests';
import { TeamNavigation } from '../../teams';
import SelectTeamModal from '../../teams/containers/SelectTeamModal';
import { OfflineBanner } from '../../offline';
import { LoginScreen, LogoutScreen } from '../../user';
import { MapNavigation } from '../../map';

import { Crashlytics, Answers } from 'react-native-fabric';

import {
  DARK_BLUE,
  GRAY_TEXT,
  selectStyle,
  Tabs,
} from '../../shared';

const ICON_SIZE = 22;

const getKeyByValue = (obj, val) => Object.keys(obj).find(key => obj[key] === val);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.trackUserLocation = this.trackUserLocation.bind(this);
    this.updateUserLocation = this.updateUserLocation.bind(this);
    this._resetNavigation = this._resetNavigation.bind(this);
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(this.props.updateNetworkStatus);
    NetInfo.isConnected.addEventListener('connectionChange', this.props.updateNetworkStatus);
  }

  componentDidMount() {
    const screenName = titleCase(getKeyByValue(Tabs, this.props.selectedTab));
    this.props.gaTrackScreenView(screenName);
    this.trackUserLocation();
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

  trackUserLocation() {
    navigator.geolocation.getCurrentPosition(
      this.updateUserLocation,
      this.handleLocationServiceError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateUserLocation);
  }

  updateUserLocation(position) {
    this.props.updateUserLocation({
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

  _renderTabs() {
    const tabBarStyle = selectStyle({
      'iPhone X': {
        'portrait': {
          height: 49 + 34,
          paddingBottom: 34,
        },
        'landscape': {
          height: 49 + 21,
          paddingBottom: 21,
          paddingHorizontal: 44,
        },
      },
    }, this.props.deviceInfo.orientation);

    return (
      <TabNavigator tabBarStyle={tabBarStyle}>
        <TabNavigator.Item
          selected={this.props.selectedTab === Tabs.MY_REQUESTS}
          title="My Requests"
          renderIcon={() => <Icon name="list-ul" size={ICON_SIZE} color={GRAY_TEXT}/>}
          renderSelectedIcon={() => <Icon name="list-ul" size={ICON_SIZE} color={DARK_BLUE}/>}
          onPress={this.handlePress(Tabs.MY_REQUESTS)}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <ServiceRequestNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selectedTab === Tabs.MAP}
          title="Map"
          renderIcon={() => <Icon name="map-marker" size={ICON_SIZE}  color={GRAY_TEXT}/>}
          renderSelectedIcon={() => <Icon name="map-marker" size={ICON_SIZE}  color={DARK_BLUE}/>}
          onPress={this.handlePress(Tabs.MAP)}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <MapNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selectedTab === Tabs.TEAMS}
          title="Teams"
          renderIcon={() => <Icon name="group" size={ICON_SIZE}  color={GRAY_TEXT}/>}
          renderSelectedIcon={() => <Icon name="group" size={ICON_SIZE}  color={DARK_BLUE}/>}
          onPress={this.handlePress(Tabs.TEAMS)}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <TeamNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selectedTab === Tabs.LOGOUT}
          title="Logout"
          renderIcon={() => <Icon name="sign-out" size={ICON_SIZE}  color={GRAY_TEXT}/>}
          renderSelectedIcon={() => <Icon name="sign-out" size={ICON_SIZE}  color={DARK_BLUE}/>}
          onPress={this.handlePress(Tabs.LOGOUT)}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <LogoutScreen />
        </TabNavigator.Item>

      </TabNavigator>
    );
  }

  render() {
    let content = null;
    if (!this.props.userIsAuthenticated) {
      content = this._renderLogin();
    } else if (!this.props.hasSelectedTeam) {
      content = this._renderTeamSelect();
    } else {
      content = this._renderTabs();
    }

    const iPhoneXStyle = selectStyle({
      'iPhone X': {
        'portrait': {
          borderTopWidth: 24,
          borderTopColor: DARK_BLUE,
        },
        'landscape': {
          marginTop: -20,
        },
      },
    }, this.props.deviceInfo.orientation);

    return (
      <View
        onLayout={this.onLayout}
        style={[styles.container, iPhoneXStyle]}
      >
        <StatusBar
          translucent
          hidden={false}
          barStyle="light-content"
          networkActivityIndicatorVisible={this.props.apiRequestInProgress}
        />
        {!this.props.networkIsConnected && <OfflineBanner />}
        {content}
      </View>
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
