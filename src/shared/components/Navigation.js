import React, { Component, PropTypes } from 'react';

import { Navigator, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import { LIGHT_BLUE, DARK_BLUE } from '../constants';

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
  _leftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <View style={styles.navElement}>
          <TouchableHighlight onPress={() => this._refreshAndGoBack(navigator) }>
            <Text style={styles.navHeader}>Back</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return <View />;
    }
  }

  /**
   * Right button refreshes whichever screen you're on
   */
  _rightButton() {
    return (
      <View style={styles.navElement}>
        <TouchableHighlight onPress={this.props.rightButtonAction}>
          <Text style={styles.navHeader}>Refresh</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _title(route, navigator, index, navState) {
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
  rightButtonAction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navAdjustment: {
    flex: 1,
    marginTop: 64,
  },
  navBar: {
    backgroundColor: DARK_BLUE,
  },
  navElement: {
    flex: 1,
    justifyContent: 'center',
  },
  navHeader: {
    color: 'white',
  }
});