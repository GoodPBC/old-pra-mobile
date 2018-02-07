import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import ServiceRequestList from '../containers/ServiceRequestList';
import EmptyServiceRequestList from './EmptyServiceRequestList';

import { BODY_BACKGROUND } from '../../shared';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BODY_BACKGROUND
  },
  modal: {
    backgroundColor: 'white',
  }
});

class MyRequestsScreen extends Component {
  constructor(props) {
    super(props);

    this.refreshTimer = null;
  }

  componentWillMount() {
    this.props.fetchServiceRequests();
  }

  componentDidMount() {
    // Refresh this screen every 60 seconds.
    this.refreshTimer = setInterval(() => {
      this.props.rerenderServiceRequests();
    }, 60000);
  }

  componentWillUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.showNoSRWarning
          ? <EmptyServiceRequestList currentTeam={this.props.currentTeam} />
        : <ServiceRequestList enableFilters />
        }
      </View>
    );
  }
}

MyRequestsScreen.propTypes = {
  fetchServiceRequests: PropTypes.func.isRequired,
};

export default withNavigation(MyRequestsScreen);
