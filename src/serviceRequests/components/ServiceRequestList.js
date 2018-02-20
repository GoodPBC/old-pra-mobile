import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  InteractionManager,
  View,
  StyleSheet,
  ListView,
  AsyncStorage,
} from 'react-native';
import moment from 'moment';
import { withNavigation } from 'react-navigation';

import Separator from '../../shared/components/Separator';

import ServiceRequestListItem from './ServiceRequestListItem';
import ServiceRequestFilters from './ServiceRequestFilters';
import UrgentServiceRequestModal from './UrgentServiceRequestModal';
import EmptyServiceRequestList from './EmptyServiceRequestList';

import Storage from 'react-native-storage';

// store as redux
var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 30, //one month
    enableCache: true,
})

const FILTERS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

class ServiceRequestList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      currentFilter: FILTERS.ACTIVE,
      urgentServiceRequests: []
    };
    this.state.dataSource = ds.cloneWithRows(props.activeServiceRequests);
    this._changeFilter = this._changeFilter.bind(this);
    this._selectServiceRequest = this._selectServiceRequest.bind(this);

    this._renderRow = this._renderRow.bind(this);
    this._renderSeparator = this._renderSeparator.bind(this);

    this.filterServiceRequestsByUrgency = this.filterServiceRequestsByUrgency.bind(this);
    this.dismissUrgentServiceRequests = this.dismissUrgentServiceRequests.bind(this);

    this.checkStorageForDismissedSR = this.checkStorageForDismissedSR.bind(this);
    this.removeRequestFromModal = this.removeRequestFromModal.bind(this);
    this.checkStorageForDismissedSR();
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.activeServiceRequests) {
        this.filterServiceRequestsByUrgency(nextProps.activeServiceRequests);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this.state.currentFilter === FILTERS.ACTIVE ? nextProps.activeServiceRequests : nextProps.inactiveServiceRequests),
      });
  }

  filterServiceRequestsByUrgency(serviceRequests){
    const urgentServiceRequests = serviceRequests.map((serviceRequest) => {
      if (serviceRequest.status === 'in_the_field' && this.state.resolvedUrgentServiceRequests) {
        if (this.state.resolvedUrgentServiceRequests.indexOf(serviceRequest.sr_number) === -1) {
          const now = new Date();
          const one_hour = 60 * 60 * 1000;
          const sr_time = moment(serviceRequest.provider_assigned_time, "YYYY-MM-DD HH:mm:ss.SSS").valueOf();
          if (now - sr_time > one_hour) {
            return serviceRequest;
          }
        }
      }
    }).filter(Boolean);

    this.setState({
      urgentServiceRequests
    });
  }


  checkStorageForDismissedSR(){
    storage.load({
        key: 'resolvedUrgentServiceRequests',
    }).then(ret => {
      this.setState({
        resolvedUrgentServiceRequests: ret
      })
    }).catch(err => {
      storage.save({
        key: 'resolvedUrgentServiceRequests',
        rawData: []
      });
      this.setState({
        resolvedUrgentServiceRequests: []
      })
    });
  }


  dismissUrgentServiceRequests(usr) {
    let resolvedUrgentServiceRequests = this.state.resolvedUrgentServiceRequests;
    for (var i = 0; i < usr.length; i++) {
      resolvedUrgentServiceRequests.push(usr[i].sr_number);

      let pingResponse = {
        actualOnsiteTime: usr[i].timeOnsite,
        modifiedAt: Date.now(),
        pingNote: usr[i].reasonName,
        reasonId: usr[i].reasonId,
        srNumber: usr[i].sr_number
      }
      this.props.updateServiceRequestPingResponse(pingResponse)
    }

    this.setState({
      resolvedUrgentServiceRequests: resolvedUrgentServiceRequests
    })


    storage.save({
      key: 'resolvedUrgentServiceRequests',
      rawData: resolvedUrgentServiceRequests,
    });


    this.setState({
      urgentServiceRequests: []
    });
  }

  removeRequestFromModal(request){
    let urgentServiceRequests = this.state.urgentServiceRequests;
    for (var i = 0; i < urgentServiceRequests.length; i++ ) {
      if (urgentServiceRequests[i].sr_number === request.sr_number) {
        urgentServiceRequests.splice(i, 1)
        this.setState({
          urgentServiceRequests
        })
        break
      }
    }
    //dismiss modal if empty
  }

  _selectServiceRequest(serviceRequest) {
    InteractionManager.runAfterInteractions(() => {
      this.props.selectServiceRequest(serviceRequest); // Select offline state.
    });
    this.props.navigation.navigate('ServiceRequestDetail');
  }

  _changeFilter(newFilter) {
    this.props.gaTrackEvent(
      'Interactions',
      'Filtered By',
      newFilter === FILTERS.ACTIVE ? 'Active' : 'Closed'
    )
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
        {
          this.state.currentFilter === FILTERS.ACTIVE &&
          !this.props.activeServiceRequests.length &&
          <EmptyServiceRequestList type="active" currentTeam={this.props.currentTeam} />
        }
        {
          this.state.currentFilter === FILTERS.INACTIVE &&
          !this.props.inactiveServiceRequests.length &&
          <EmptyServiceRequestList type="closed" currentTeam={this.props.currentTeam} />
        }
        <ListView
          removeClippedSubviews={false}
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
            removeRequestFromModal={this.removeRequestFromModal}
          />
          : null
        }
      </View>
    );
  }
}

ServiceRequestList.propTypes = {
  enableFilters: PropTypes.bool,
  selectServiceRequest: PropTypes.func.isRequired,
  gaTrackEvent: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default withNavigation(ServiceRequestList);
