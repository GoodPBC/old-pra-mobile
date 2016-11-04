import React, { Component, PropTypes } from 'react';
import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Separator from './Separator';

export default class SelectTeamList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = { dataSource: ds.cloneWithRows(props.teams) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.teams)
      })
    }
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View key={rowData['id']}>
        <TouchableHighlight
          onPress={() => this.props.onSelectTeam(rowData)}>
          <View>
            <Text>{rowData['name']}</Text>
          </View>
        </TouchableHighlight>
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

SelectTeamList.propTypes = {
  onSelectTeam: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
};

