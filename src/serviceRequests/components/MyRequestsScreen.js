import React, { Component, PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';

import moment from 'moment';

import ServiceRequestList from '../containers/ServiceRequestList';
import EmptyServiceRequestList from './EmptyServiceRequestList';

export default class MyRequestsScreen extends Component {
  
  constructor(props) {
    super(props)

    this.filterServiceRequestsByUrgency = this.filterServiceRequestsByUrgency.bind(this)
  }

  componentWillMount() {
    this.props.fetchServiceRequests();
    if (this.props.serviceRequests) {
      this.filterServiceRequestsByUrgency();
    }
  }

  filterServiceRequestsByUrgency(){
    let urgentServiceRequests = this.props.serviceRequests.map( (serviceRequest) => {
      if (serviceRequest.status === "in_the_field") {
        let now = new Date();
        let one_hour = 60 * 60 * 1000;
        let sr_time = moment(serviceRequest.updated_at).valueOf();
        if (now - sr_time > one_hour && serviceRequest.has_alerted === false) {
          return serviceRequest
        }
      }
    }).filter(Boolean)

    console.log(urgentServiceRequests)
  }

  render() {
    console.log(this.props.serviceRequests);
    return (
      <View style={styles.container}>
      {this.props.serviceRequests === undefined || this.props.serviceRequests.length == 0 ?
        <EmptyServiceRequestList />
      : <ServiceRequestList navigator={this.props.navigator} enableFilters />
      }
      </View>
    );
  }
}

MyRequestsScreen.propTypes = {
  fetchServiceRequests: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
});