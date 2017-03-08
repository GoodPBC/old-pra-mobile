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

    this.state.dataSource = ds.cloneWithRows(this._filteredServiceRequests(props.serviceRequests));
    this._changeFilter = this._changeFilter.bind(this);
    this._selectServiceRequest = this._selectServiceRequest.bind(this);

    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);

    this.filterServiceRequestsByUrgency = this.filterServiceRequestsByUrgency.bind(this);
    this.dismissUrgentServiceRequests = this.dismissUrgentServiceRequests.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.serviceRequests) {
        this.filterServiceRequestsByUrgency();
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this._filteredServiceRequests(nextProps.serviceRequests)),
      });
  }

  filterServiceRequestsByUrgency(){
    const urgentServiceRequests = this._filteredServiceRequests(FILTERS.ACTIVE).map((serviceRequest) => {
      if (serviceRequest.status === 'in_the_field') {
        const now = new Date();
        // one minute for now for testing pursposes
        const one_hour = 60 * 1000;
        const sr_time = moment(serviceRequest.updated_at).valueOf();
        if (now - sr_time > one_hour && serviceRequest.has_alerted === false) {
          return serviceRequest;
        }
      }
    }).filter(Boolean);

    this.setState({
      urgentServiceRequests
    });
  }

  dismissUrgentServiceRequests(usr) {
    this.props.updateServiceRequestsWithNotes(usr);
    this.setState({
      urgentServiceRequests: []
    });
  }

  _selectServiceRequest(serviceRequest) {
    this.props.selectServiceRequest(serviceRequest); // Select offline state.
    this.props.fetchServiceRequestDetails(serviceRequest);
    this.props.navigator.push({ // Push navigation
      index: 1,
      title: 'Request Details',
    });
  }

  _changeFilter(newFilter) {
      this.setState({ currentFilter: newFilter }, () => {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(
          this._filteredServiceRequests())
        });
      });
  }

  _filteredServiceRequests(filter) {
    const useFilter = filter || this.state.currentFilter;
    return useFilter === FILTERS.ACTIVE
         ? this.props.activeServiceRequests
         : this.props.inactiveServiceRequests;
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
          {
            this.state.urgentServiceRequests.length > 0 ?
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});
