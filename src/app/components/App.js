import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { ServiceRequestNavigation } from '../../serviceRequests';
import { TeamNavigation } from '../../teams';
import { SyncNavigation } from '../../offline';

import { LoginScreen, LogoutScreen } from '../../user';

import {
  DARK_BLUE,
  GRAY_TEXT,
} from '../../shared';

const Tabs = {
  my_requests: 0,
  sync: 1,
  teams: 2,
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: Tabs.my_requests,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage) {
      Alert.alert('Error', newProps.errorMessage, [
        { text: 'OK', onPress: this.props.clearErrorMessage }
      ]);
    }
  }

  _renderLogin() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.userIsAuthenticated !== true}
          onRequestClose={() => console.log('requested close')}
          >
          <LoginScreen {...this.props}/>
        </Modal>
      </View>
    )
  }

  _renderTabs() {
    return (
      <ScrollableTabView
        tabBarInactiveTextColor={GRAY_TEXT}
        tabBarActiveTextColor={DARK_BLUE}
        tabBarPosition="bottom"
        tabBarUnderlineStyle={{backgroundColor: 'white'}}>
        <ServiceRequestNavigation tabLabel="My Requests" />
        <TeamNavigation tabLabel="Teams" />
        <SyncNavigation tabLabel="Sync" />
        <LogoutScreen tabLabel="Logout" />
      </ScrollableTabView>
    );
  }

  render() {
    let content = null;
    if (this.props.userIsAuthenticated) {
       content = this._renderTabs();
    } else {
      content = this._renderLogin();
    }
    return (
        <View style={styles.container}>
           <StatusBar
            networkActivityIndicatorVisible={this.props.apiRequestInProgress}
          />
          {content}
        </View>
      );
  }
}

App.propTypes = {
  apiRequestInProgress: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  userIsAuthenticated: PropTypes.bool,
}

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
});