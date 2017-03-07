import React, { Component, PropTypes } from 'react';
import { ListView, ScrollView, StyleSheet } from 'react-native';
import Separator from '../../shared/components/Separator';
import SelectTeamListItem from './SelectTeamListItem';
import { LIGHT_BLUE } from '../../shared';

export default class SelectTeamList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = { dataSource: ds.cloneWithRows(props.teams) };

    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeams();
    this.props.selectTeam(this.props.currentTeam);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.teams)
      });
    }
  }

  _renderRow(team) {
    const isSelected = this.props.selectedTeam && this.props.selectedTeam.id === team.id;
    console.log({ team, isSelected });
    return (
      <SelectTeamListItem
        team={team}
        onSelectTeam={this.props.selectTeam}
        selected={isSelected}
        onViewTeamDetails={this.props.onViewTeamDetails}
      />
    );
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <Separator key={rowID} style={styles.separator} />
    );
  }

  render() {
    const { selectedTeam } = this.props;
    const selectedTeamKey = selectedTeam ? selectedTeam.id : 0;
    return (
      <ListView
        key={`list_${selectedTeamKey}`}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
        enableEmptySections
      />
    );
  }
}

SelectTeamList.propTypes = {
  currentTeam: PropTypes.object,
  fetchTeams: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  onViewTeamDetails: PropTypes.func.isRequired,
  selectedTeam: PropTypes.object,
  teams: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: LIGHT_BLUE,
  },
});