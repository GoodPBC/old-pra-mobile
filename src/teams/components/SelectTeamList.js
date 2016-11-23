import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet } from 'react-native';
import Separator from '../../shared/components/Separator';
import SelectTeamListItem from './SelectTeamListItem';

export default class SelectTeamList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = { dataSource: ds.cloneWithRows(props.teams) };
  }

  componentWillMount() {
    this.props.fetchTeams();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.teams)
      })
    }
  }

  _renderRow(team, sectionID) {
    return (
      <SelectTeamListItem
        team={team}
        onSelectTeam={this.props.selectTeam}
        selected={team.selected}
        onViewTeamDetails={this.props.onViewTeamDetails}
      />
    );
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <Separator key={rowID} />
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
        enableEmptySections
      />
    );
  }
}

SelectTeamList.propTypes = {
  fetchTeams: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  onViewTeamDetails: PropTypes.func.isRequired,
  selectedTeam: PropTypes.object,
  teams: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
});
