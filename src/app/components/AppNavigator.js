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
  LIGHT_GRAY,
} from '../../shared';

const ICON_SIZE = 22;

const TabBarIcon = iconName => ({ tintColor }) => (
  <FontAwesome name={iconName} size={ICON_SIZE} color={tintColor} />
);

const routeConfigs = {
  [Tabs.MY_REQUESTS]: {
    screen: ServiceRequestStackNavigator,
    navigationOptions: {
      title: 'My Requests',
      tabBarIcon: TabBarIcon('list-ul'),
    },
  },
  [Tabs.MAP]: {
    screen: MapStackNavigator,
    navigationOptions: {
      title: 'Map',
      tabBarIcon: TabBarIcon('map-marker'),
    },
  },
  [Tabs.TEAMS]: {
    screen: TeamStackNavigator,
    navigationOptions: {
      title: 'Teams',
      tabBarIcon: TabBarIcon('group'),
    },
  },
  [Tabs.LOGOUT]: {
    screen: UserStackNavigator,
    navigationOptions: {
      title: 'Logout',
      tabBarIcon: TabBarIcon('sign-out'),
    },
  },
};

const tabNavigatorConfig = {
  initialRouteName: Tabs.MY_REQUESTS,
  tabBarOptions: {
    activeTintColor: DARK_BLUE,
    inactiveTintColor: GRAY_TEXT,
    style: {
      borderTopWidth: 1,
      borderTopColor: LIGHT_GRAY,
    },
  },
  order: [
    Tabs.MY_REQUESTS,
    Tabs.MAP,
    Tabs.TEAMS,
    Tabs.LOGOUT,
  ],
};

const AppNavigator = TabNavigator(
  routeConfigs,
  tabNavigatorConfig,
);

export default AppNavigator;
