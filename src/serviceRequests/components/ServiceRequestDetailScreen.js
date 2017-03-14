import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import BannerWithNumber from './BannerWithNumber';
import ResolutionSection from './resolution/ResolutionSection';
import DetailsSection from './DetailsSection';
import OnsiteSection from './OnsiteSection';
import {
  DARK_BLUE,
  BODY_BACKGROUND
} from '../../shared';


export default class ServiceRequestDetailScreen extends Component {

  componentWillUnmount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.unselectServiceRequest();
    });
  }

  render() {
    if (!this.props.serviceRequest) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator style={styles.loading} />
        </View>
      );
    }

    const canGoOnsite = this.props.serviceRequest && this.props.serviceRequest.status === 'in_the_field';

    return (
      <View style={styles.container}>
        <BannerWithNumber serviceRequest={this.props.serviceRequest} />
        <ScrollView>
          { canGoOnsite ?
            (
              <OnsiteSection {...this.props} />
            ) : null
          }
          <ResolutionSection {...this.props} />
          <DetailsSection serviceRequest={this.props.serviceRequest} />
        </ScrollView>
      </View>
    );
  }
}

ServiceRequestDetailScreen.propTypes = {
  serviceRequest: PropTypes.object,
  unselectServiceRequest: PropTypes.func.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: DARK_BLUE,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: BODY_BACKGROUND
  },
  detailsContainer: {
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  loading: {
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionHeader: {
    color: 'gray',
    fontVariant: ['small-caps'],
  },
});