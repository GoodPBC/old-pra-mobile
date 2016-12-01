import React, { Component, PropTypes } from 'react';
import { ListView, ScrollView } from 'react-native';
import Separator from '../../shared/components/Separator';
import SelectTeamListItem from './SelectTeamListItem';

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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.teams)
      });
    }
  }

  _renderRow(team) {
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
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
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