import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, View } from 'react-native';

export default class ServiceRequestList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = { dataSource: ds.cloneWithRows(props.serviceRequests) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.serviceRequests)
    })
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View>
        <Text>Foo</Text>
      </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections={true}
      />
    );
  }
}

ServiceRequestList.propTypes = {
  serviceRequests: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});