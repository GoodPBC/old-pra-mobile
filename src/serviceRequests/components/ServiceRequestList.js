import React, { Component, PropTypes } from 'react';

import { View, StyleSheet, ListView } from 'react-native';

import Separator from '../../shared/components/Separator';

import ServiceRequestListItem from './ServiceRequestListItem';

import { Button } from '../../shared';

export default class ServiceRequestList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = { 
      dataSource: ds.cloneWithRows(props.serviceRequests),
      displayServiceRequests: 'active' 
    };

    this._selectServiceRequest = this._selectServiceRequest.bind(this);

    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceRequests) {
      this._sortServiceRequests(nextProps.serviceRequests);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.serviceRequests),
      });
    }
  }

  _sortServiceRequests(serviceRequests) {
    
    function compare(a, b){
      if (statusMap[a] < statusMap[b]) {
        return -1;
      }
      if (statusMap[a] > statusMap[b]) {
        return 1;
      }
      return 0;
    }

    let statusMap = {
      on_site: 0,
      in_the_field: 1,
      visit_complete: 2,
      closed: 3,
      in_process: 4,
      assigned: 5
    };

    return serviceRequests.sort(compare);
  }

  _selectServiceRequest(serviceRequest) {
    this.props.selectServiceRequest(serviceRequest); // Select offline state.
    this.props.fetchServiceRequestDetails(serviceRequest);
    this.props.navigator.push({ // Push navigation
      index: 1,
      title: `SR# ${serviceRequest.sr_number}`,
    });
  }

  _renderRow(rowData) {
    if (this.state.displayServiceRequests === 'active') {
      if (rowData.status === 'in_the_field' || rowData.status === 'on_site') {
        return (
          <ServiceRequestListItem
            serviceRequest={rowData}
            selectServiceRequest={this._selectServiceRequest}
          />
        );
      } else {
        return null;
      }
    } else {
      if (rowData.status === 'visit_complete'|| rowData.statue == 'closed') {
        return (
          <ServiceRequestListItem
            serviceRequest={rowData}
            selectServiceRequest={this._selectServiceRequest}
          />
        );
      } else {
        return null;
      }
    }
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <Separator key={rowID} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <Button style={styles.button} onPress={ () => this.setState({ displayServiceRequests: 'active' }) }>Active</Button>
          <Button style={styles.button} onPress={ () => this.setState({ displayServiceRequests: 'inactive' }) }>Closed</Button>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          enableEmptySections
        />
      </View>
    );
  }
}

ServiceRequestList.propTypes = {
  fetchServiceRequestDetails: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  selectServiceRequest: PropTypes.func.isRequired,
  serviceRequests: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'white'
  }
});
