import React, { Component, PropTypes } from 'react';

import {
  Image,
  Navigator,
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

    this._refreshAndGoBack = this._refreshAndGoBack.bind(this);
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

    return (
      <Navigator
        {...this.props}
        configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={routeMapper}
          navigationStyles={Navigator.NavigationBar.StylesIOS}
          style={styles.navBar}
          />
        }
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'

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