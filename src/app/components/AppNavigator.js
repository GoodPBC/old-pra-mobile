import React from 'react';
import { TabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ServiceRequestStackNavigator } from '../../serviceRequests';
import { MapStackNavigator } from '../../map';
import { TeamStackNavigator } from '../../teams';
import { UserStackNavigator } from '../../user';

import {
  Tabs,
  DARK_BLUE,
  GRAY_TEXT,
} from '../../shared';

const ICON_SIZE = 22;

const TabBarIcon = iconName => ({ tintColor }) => (
  <FontAwesome name={iconName} size={ICON_SIZE} color={tintColor} />
);

const routeConfigs = {
  [Tabs.MY_REQUESTS]: {
    screen: ServiceRequestStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'My Requests',
      tabBarIcon: TabBarIcon('list-ul'),
    }),
  },
  [Tabs.MAP]: {
    screen: MapStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      tabBarIcon: TabBarIcon('map-marker'),
    }),
  },
  [Tabs.TEAMS]: {
    screen: TeamStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Teams',
      tabBarIcon: TabBarIcon('group'),
    }),
  },
  [Tabs.LOGOUT]: {
    screen: UserStackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Logout',
      tabBarIcon: TabBarIcon('sign-out'),
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
