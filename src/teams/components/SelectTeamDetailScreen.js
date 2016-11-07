import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../shared/components/Button';
import TeamUserList from '../containers/TeamUserList';

export default class SelectTeamDetailScreen extends Component {
  constructor(props){
    super(props);

    this._onJoinTeam = this._onJoinTeam.bind(this);
  }

  _onJoinTeam() {
    this.props.joinTeam(this.props.team);
    this.props.navigator.popToTop();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <TeamUserList team={this.props.team} />
        </View>
        <View style={styles.bottomButton}>
          <Button onPress={this._onJoinTeam}>Join Team</Button>
        </View>
      </View>
    );
  }
}

SelectTeamDetailScreen.propTypes = {
  joinTeam: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  listWrapper: {
    flex: 1,
  }
});