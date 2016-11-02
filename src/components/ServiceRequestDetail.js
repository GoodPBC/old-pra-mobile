import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, View } from 'react-native';

export default class ServiceRequestDetail extends Component {
  constructor(props) {
    super(props);

    //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //this.state = { dataSource: ds.cloneWithRows(props.serviceRequests) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      //dataSource: this.state.dataSource.cloneWithRows(nextProps.serviceRequests)
    })
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View>
        <Text>{rowData['original_request_number']}</Text>
        <Text>{rowData['complaint_type']}</Text>
        <Text>{rowData['complaint_details']}</Text>
        <Text>{rowData['request_created_at']}</Text>
      </View>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View style={{height: 1, backgroundColor: 'lightgray'}} />
    );
  }

  render() {
    return (
      <p>This is the service request detail</p>
    );
  }
}

ServiceRequestDetail.propTypes = {
  //serviceRequests: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});