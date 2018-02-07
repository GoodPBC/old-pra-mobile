import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ServiceRequestStackNavigator } from '../../serviceRequests';
import { MapNavigation } from '../../map';
import { TeamNavigation } from '../../teams';
import { UserStackNavigator } from '../../user';

import {
  Tabs,
  DARK_BLUE,
  GRAY_TEXT,
} from '../../shared';

const ICON_SIZE = 22;

const routeConfigs = {
  [Tabs.MY_REQUESTS]: {
    screen: ServiceRequestStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'My Requests',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="list-ul" size={ICON_SIZE} color={tintColor} />
    }),
  },
  [Tabs.MAP]: {
    screen: UserStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="map-marker" size={ICON_SIZE} color={tintColor} />
    }),
  },
  [Tabs.TEAMS]: {
    screen: UserStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Teams',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="group" size={ICON_SIZE} color={tintColor} />
    }),
  },
  [Tabs.LOGOUT]: {
    screen: UserStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Logout',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="sign-out" size={ICON_SIZE} color={tintColor} />
    }),
  },
};

const tabNavigatorConfig = {
  initialRouteName: Tabs.MY_REQUESTS.toString(),
  tabBarOptions: {
    activeTintColor: DARK_BLUE,
    inactiveTintColor: GRAY_TEXT,
  },
  navigationOptions: ({ navigation }) => ({
    // tabBarOnPress: (x) => onTabBarPress(Number(x.route.routeName))()
  }),
};

const AppNavigator = TabNavigator(
  routeConfigs,
  tabNavigatorConfig,
);

export default AppNavigator;
