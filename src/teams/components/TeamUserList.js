import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import Separator from '../../shared/components/Separator';
import TeamUserListItem from './TeamUserListItem';

export default class TeamUserList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: ds.cloneWithRows(props.users) };

    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeamUsers(this.props.team);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.users)
      });
    }
  }

  _renderRow(user) {
    return (
      <TeamUserListItem user={user} />
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

TeamUserList.propTypes = {
  fetchTeamUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  team: PropTypes.object.isRequired,
};

