import React, { Component } from 'react';
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

const tabIcons = [
  { active: require('./img/my-requests-icon-active.png'), inactive: require('./img/my-requests-icon-inactive.png') },
  { active: require('./img/teams-icon-active.png'), inactive: require('./img/teams-icon-inactive.png') },
  { active: require('./img/sync-icon-active.png'), inactive: require('./img/sync-icon-inactive.png') },
  { active: require('./img/my-requests-icon-active.png'), inactive: require('./img/my-requests-icon-inactive.png') },
];

export default class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          const isActiveTab = this.props.activeTab === i;
          const tabIcon = isActiveTab ? tabIcons[i].active : tabIcons[i].inactive;
          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <View style={styles.group}>
                <Image source={tabIcon} />
                <Text style={[styles.text, isActiveTab ? styles.activeText : null ]}>{tab}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

TabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
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