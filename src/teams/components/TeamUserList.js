import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Separator from '../../shared/components/Separator';

export default class TeamUserList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { dataSource: ds.cloneWithRows(props.team.users) };
  }

  /**
   * List of users is nested within the team json, like so: team.users
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.team) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.team.users)
      })
    }
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View key={rowData['id']}>
        <View>
          <Text>{rowData['email']}</Text>
        </View>
      </View>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
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
        enableEmptySections={true}
      />
    );
  }
}

TeamUserList.propTypes = {
  team: PropTypes.object.isRequired,
};

