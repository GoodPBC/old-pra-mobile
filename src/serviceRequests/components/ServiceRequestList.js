import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Separator from '../../shared/components/Separator';

export default class ServiceRequestList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = { dataSource: ds.cloneWithRows(props.serviceRequests) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceRequests) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.serviceRequests)
      })
    }
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View key={rowData['id']}>
        <TouchableHighlight
          onPress={() => this.props.onSelectServiceRequest(rowData)}
          underlayColor={'gray'}>
          <View>
            <Text>{rowData['original_request_number']}</Text>
            <Text>{rowData['complaint_type']}</Text>
            <Text>{rowData['complaint_details']}</Text>
            <Text>{rowData['request_created_at']}</Text>
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

ServiceRequestList.propTypes = {
  onSelectServiceRequest: PropTypes.func.isRequired,
  serviceRequests: PropTypes.array.isRequired,
};

