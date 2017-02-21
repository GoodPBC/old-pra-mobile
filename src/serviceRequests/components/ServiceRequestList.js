import React, { Component, PropTypes } from 'react';

import { View, StyleSheet, ListView } from 'react-native';

import moment from 'moment';

import Separator from '../../shared/components/Separator';

import ServiceRequestListItem from './ServiceRequestListItem';
import ServiceRequestFilters from './ServiceRequestFilters';
import UrgentServiceRequestModal from './UrgentServiceRequestModal';

const FILTERS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export default class ServiceRequestList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      currentFilter: FILTERS.ACTIVE,
      urgentServiceRequests: []
    };

    this._includeServiceRequest = this._includeServiceRequest.bind(this);
    this.state.dataSource = ds.cloneWithRows(this._filteredServiceRequests(props.serviceRequests));
    this._changeFilter = this._changeFilter.bind(this);
    this._selectServiceRequest = this._selectServiceRequest.bind(this);

    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);

    this.filterServiceRequestsByUrgency = this.filterServiceRequestsByUrgency.bind(this);
    this.dismissUrgentServiceRequests = this.dismissUrgentServiceRequests.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops on servicerequest list');
    console.log(nextProps);
      if (nextProps.serviceRequests) {
        this.filterServiceRequestsByUrgency();
      }
      this._sortServiceRequests(nextProps.serviceRequests);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this._filteredServiceRequests(nextProps.serviceRequests)),
      });
  }

  filterServiceRequestsByUrgency(){
    let urgentServiceRequests = this.props.serviceRequests.map( (serviceRequest) => {
      if (serviceRequest.status === "in_the_field") {
        let now = new Date();
        // one minute for now for testing pursposes
        let one_hour = 60 * 1000;
        let sr_time = moment(serviceRequest.updated_at).valueOf();
        if (now - sr_time > one_hour && serviceRequest.has_alerted === false) {
          return serviceRequest
        }
      }
    }).filter(Boolean)

    this.setState({
      urgentServiceRequests: urgentServiceRequests
    })
  }

  dismissUrgentServiceRequests() {
    this.setState({
      urgentServiceRequests: null
    })
    // also hit the server to register them as viewed
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
      title: `Request Details`,
    });
  }

  _changeFilter(newFilter) {
      this.setState({ currentFilter: newFilter }, () => {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(
          this._filteredServiceRequests(this.props.serviceRequests))
        });
      });
  }

  _filteredServiceRequests(serviceRequests) {
    return serviceRequests.filter(sr => this._includeServiceRequest(sr));
  }

  // Runs as a filter predicate
  _includeServiceRequest(serviceRequest) {
    if (this.state.currentFilter === FILTERS.ACTIVE) {
      return serviceRequest.status === 'in_the_field' || serviceRequest.status === 'on_site';
    }

    return serviceRequest.status === 'visit_complete' || serviceRequest.statue === 'closed';
  }

  _renderRow(rowData) {
    return (
      <ServiceRequestListItem
        key={rowData.sr_number}
        serviceRequest={rowData}
        selectServiceRequest={this._selectServiceRequest}
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
      <View style={styles.container}>
        {this.props.enableFilters && <ServiceRequestFilters onFilterChange={this._changeFilter} />}
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections
          />
          { this.state.urgentServiceRequests.length ?
          <UrgentServiceRequestModal 
            style={styles.modal}
            urgentServiceRequests={this.state.urgentServiceRequests} 
            dismissUrgentServiceRequests={this.dismissUrgentServiceRequests}
            />
          : null  
        }
      </View>
    );
  }
}

ServiceRequestList.propTypes = {
  fetchServiceRequestDetails: PropTypes.func.isRequired,
  enableFilters: PropTypes.bool,
  navigator: PropTypes.object.isRequired,
  selectServiceRequest: PropTypes.func.isRequired,
  serviceRequests: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
