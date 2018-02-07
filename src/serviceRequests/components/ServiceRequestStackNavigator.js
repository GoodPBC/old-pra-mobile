import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MyRequestsScreen from '../containers/MyRequestsScreen';
import ResolutionScreen from '../containers/ResolutionScreen';
import ServiceRequestDetailScreen from '../containers/ServiceRequestDetailScreen';
import { createStackNavigator } from '../../shared';

const styles = StyleSheet.create({
  refreshButton: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
});

const HeaderRightButton = ({ isRefreshing, networkIsConnected, syncServiceRequests }) => (
  <TouchableOpacity
    style={styles.refreshButton}
    disabled={!networkIsConnected}
    onPress={syncServiceRequests}
  >
    {
      (networkIsConnected && isRefreshing) ? (
        <ActivityIndicator color="white" />
      ) : (
        <MaterialIcons name="refresh" size={28} color="white" />
      )
    }
  </TouchableOpacity>
);

const ServiceRequestStackNavigator = createStackNavigator(
  {
    MyRequests: {
      screen: MyRequestsScreen,
      navigationOptions: ({ screenProps }) => ({
        title: 'My Requests',
        headerRight: HeaderRightButton(screenProps),
      }),
    },
    ServiceRequestDetail: {
      screen: ServiceRequestDetailScreen,
      navigationOptions: {
        title: 'Request Details',
      },
    },
    Resolution: {
      screen: ResolutionScreen,
      navigationOptions: {
        title: 'Resolution',
      },
    },
  },
  {
    initialRouteName: 'MyRequests',
  },
);

export default class ServiceRequestStackNavigatorComponent extends React.PureComponent {
  render() {
    const {
      isRefreshing,
      networkIsConnected,
      syncServiceRequests,
    } = this.props;

    return (
      <ServiceRequestStackNavigator
        screenProps={{
          isRefreshing,
          networkIsConnected,
          syncServiceRequests,
        }}
      />
    );
  }
}
