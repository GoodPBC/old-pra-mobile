import React, { Component, PropTypes } from 'react';

import {
  BackAndroid,
  Image,
  Navigator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { DARK_BLUE } from '../constants';
import { GREY_TEXT } from '../constants';

import refreshIcon from './img/refresh-icon.png';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this._leftButton = this._leftButton.bind(this);
    this._rightButton = this._rightButton.bind(this);
    this._title = this._title.bind(this);

    this._handleAndroidBackButton = this._handleAndroidBackButton.bind(this);
    this._refreshAndGoBack = this._refreshAndGoBack.bind(this);

    this.navigator = null; // Ref for Back button handler
  }

  componentDidMount() {
    // This handler gets added for every tab.
    // These navigation components are never un-mounted, so there
    // is no opportunity to remove the handler.
    BackAndroid.addEventListener('hardwareBackPress', this._handleAndroidBackButton);
  }

  _handleAndroidBackButton() {
    const navigator = this.navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }

  _refreshAndGoBack(navigator) {
    this.props.onBack();
    navigator.pop();
  }

  /**
   * Back button only on the details screen
   */
  _leftButton(route, navigator, index) {
    if (index > 0) {
      return (
        <View style={styles.navElement}>
          <TouchableOpacity onPress={() => this._refreshAndGoBack(navigator) }>
            <Text style={styles.navHeader}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <View />;
  }

  /**
   * Right button refreshes whichever screen you're on
   */
  _rightButton(route, navigator, index) {
    const { rightButtonAction } = this.props;
    if (rightButtonAction) {
      return (
        <View style={styles.navElement}>
          <TouchableOpacity onPress={() => this.props.rightButtonAction(route, navigator, index)}>
            <Image source={refreshIcon} />
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }

  _title(route) {
    return (
      <View style={styles.navElement}>
        <Text style={styles.navHeader}>{route.title}</Text>
      </View>
    );
  }

  render() {
    const routeMapper = {
      LeftButton: this._leftButton,
      RightButton: this._rightButton,
      Title: this._title,
    };

    const navigationStyles = Platform.OS === 'ios' ?
                            Navigator.NavigationBar.StylesIOS :
                            Navigator.NavigationBar.StylesIOS;

    // Navbar looks too small at the top on Android.
    const navigatorStyles = Platform.OS === 'ios' ?
                            {} :
                            { marginTop: 10 };

    return (
      <Navigator
        {...this.props}
        configureScene={() => {
          return {
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
            // This prevents left/right swiping on the navigation
            gestures: {
              pop: {},
            },
          };
        }}
        ref={(nav) => { this.navigator = nav; }}
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={routeMapper}
          navigationStyles={navigationStyles}
          style={styles.navBar}
          />
        }
        style={navigatorStyles}
      />
    );
  }
}

Navigation.propTypes = {
  onBack: PropTypes.func.isRequired,
  renderScene: PropTypes.func.isRequired,
  rightButtonAction: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: DARK_BLUE,
    borderBottomWidth: 0,
  },
  navElement: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  navHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});