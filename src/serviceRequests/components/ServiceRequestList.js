import React, { Component, PropTypes } from 'react';

import { View, StyleSheet, ListView } from 'react-native';

import Separator from '../../shared/components/Separator';

import ServiceRequestListItem from './ServiceRequestListItem';

import { Button, InvertButton } from '../../shared';

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
          <InvertButton 
            style={this.state.displayServiceRequests === 'active' ? styles.buttonActive : styles.button} 
            textStyle={this.state.displayServiceRequests === 'active' ? styles.textActive : styles.text} 
            onPress={ () => this.setState({ displayServiceRequests: 'active' }) }>
            ACTIVE
          </InvertButton>
          <InvertButton 
            style={this.state.displayServiceRequests === 'inactive' ? styles.buttonActive : styles.button} 
            textStyle={this.state.displayServiceRequests === 'inactive' ? styles.textActive : styles.text} 
            onPress={ () => this.setState({ displayServiceRequests: 'inactive' }) }>
            CLOSED
          </InvertButton>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
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
    justifyContent: 'space-around',
    backgroundColor: '#1A73C2',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  button: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#1A73C2'
  },
  buttonActive: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    color: '#1A73C2'
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textActive: {
    color: '#1A73C2',
    fontSize: 14,
    fontWeight: 'bold'
  },
});
