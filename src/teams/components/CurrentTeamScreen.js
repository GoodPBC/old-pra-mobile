import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import PropTypes from 'prop-types';
import {
  GradientBackground,
  InvertButton,
  X_AXIS_PADDING,
  BODY_BACKGROUND,
} from '../../shared';
import CurrentTeamHeader from './CurrentTeamHeader';

export default class CurrentTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToChangeTeam = this._goToChangeTeam.bind(this);
    // this._goToCreateTeam = this._goToCreateTeam.bind(this);
    // this._goToJoinTeam = this._goToJoinTeam.bind(this);
    // this._leaveTeam = this._leaveTeam.bind(this);
  }

  _goToChangeTeam() {
    this.props.navigation.navigate('ChangeTeam');
  }

  // _goToCreateTeam() {
  //   this.props.navigator.push({
  //     index: RouteIndices.CREATE_TEAM,
  //     title: 'Create a Team',
  //   });
  // }

  // _goToJoinTeam() {
  //   this.props.navigator.push({
  //     index: RouteIndices.TEAM_LIST,
  //     title: 'Join a Team',
  //   });
  // }

  // _leaveTeam() {
  //   const { currentTeam } = this.props;
  //   this.props.leaveTeam();
  // }

  /**
   * Need to adjust the height of the container to fit
   * the appropriate number of buttons.
   */
  _buttonsContainerHeight() {
    const hasJoinedTeam = !!this.props.currentTeam;
    const buttonSpace = 75;
    if (hasJoinedTeam) { // 3 buttons
      // return buttonSpace * 3;
    }

    return buttonSpace * 2;
  }

  render() {
    const { currentTeam, userName } = this.props;
    const changeTeamButton = <InvertButton onPress={this._goToChangeTeam} withBorder>Change Team</InvertButton>;
    const hasJoinedTeam = !!this.props.currentTeam;
    return (
      <View style={styles.container}>
        <CurrentTeamHeader currentTeam={currentTeam} userName={userName} />
        <View style={[styles.buttonsContainer]}>
          {hasJoinedTeam && changeTeamButton}
        </View>
      </View>
    );
  }
}

CurrentTeamScreen.propTypes = {
  currentTeam: PropTypes.any,
  leaveTeam: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  buttonsContainer: {
    // flex: 1,
    // height: 150,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: BODY_BACKGROUND,
    flex: 1,
    // justifyContent: 'space-around',
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    // marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  teamName: {
    fontStyle: 'italic',
  }
});
