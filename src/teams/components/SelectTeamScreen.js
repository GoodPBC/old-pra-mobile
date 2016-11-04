import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SelectTeamList from '../containers/SelectTeamList';
import SelectTeamDetailScreen from '../containers/SelectTeamDetailScreen';

export default class SelectTeamScreen extends Component {
  constructor(props){
    super(props);
    this._goToDetail = this._goToDetail.bind(this);
  }

  _goToDetail(team) {
    this.props.navigator.push({
      component: SelectTeamDetailScreen,
      title: team['name'],
      passProps: {
        team,
      },
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <SelectTeamList onSelectTeam={this._goToDetail} />
      </View>
    );
  }
}

SelectTeamScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});