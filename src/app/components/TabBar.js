import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  DARK_BLUE,
} from '../../shared';

import myRequestsActiveIcon from './img/my-requests-icon-active.png';
import myRequestsInactiveIcon from './img/my-requests-icon-inactive.png';
import teamsActiveIcon from './img/teams-icon-active.png';
import teamsInactiveIcon from './img/teams-icon-inactive.png';
import syncActiveIcon from './img/sync-icon-active.png';
import syncInactiveIcon from './img/sync-icon-inactive.png';

const tabIcons = [
  { active: myRequestsActiveIcon, inactive: myRequestsInactiveIcon },
  { active: teamsActiveIcon, inactive: teamsInactiveIcon },
  { active: syncActiveIcon, inactive: syncInactiveIcon },
  { active: myRequestsActiveIcon, inactive: myRequestsInactiveIcon },
];

export default function TabBar({ style, activeTab, goToPage, tabs }) {
  return (
    <View style={[styles.tabs, style]}>
      {tabs.map((tab, i) => {
        const isActiveTab = activeTab === i;
        const tabIcon = isActiveTab ? tabIcons[i].active : tabIcons[i].inactive;
        return (
          <TouchableOpacity key={tab} onPress={() => goToPage(i)} style={styles.tab}>
            <View style={styles.group}>
              <Image source={tabIcon} />
              <Text style={[styles.text, isActiveTab ? styles.activeText : null]}>{tab}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

TabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  style: View.propTypes.style,
  tabs: React.PropTypes.array,
};

const styles = StyleSheet.create({
  activeText: {
    color: DARK_BLUE,
  },
  group: {
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  text: {
    fontSize: 10,
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
  },
});