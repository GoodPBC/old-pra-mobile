import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Separator from '../../shared/components/Separator';

import ServiceRequestListItem from './ServiceRequestListItem';

export default class ServiceRequestList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = { dataSource: ds.cloneWithRows(props.serviceRequests) };

    this._selectServiceRequest = this._selectServiceRequest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceRequests) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.serviceRequests)
      })
    }
  }

  _selectServiceRequest(serviceRequest) {
    this.props.selectServiceRequest(serviceRequest); // Select offline state.
    this.props.fetchServiceRequestDetails(serviceRequest);
    this.props.navigator.push({ // Push navigation
      index: 1,
      title: `SR# ${serviceRequest['original_request_number']}`,
    });
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <ServiceRequestListItem serviceRequest={rowData} selectServiceRequest={this._selectServiceRequest} />
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
  navigator: PropTypes.object.isRequired,
  selectServiceRequest: PropTypes.func.isRequired,
  serviceRequests: PropTypes.array.isRequired,
};

