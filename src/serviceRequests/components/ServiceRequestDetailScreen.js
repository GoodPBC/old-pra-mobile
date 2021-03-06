import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
import PanhandlingSection from './PanhandlingSection';
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
    const { serviceRequest, screenProps: { switchTab } } = this.props;

    if (!serviceRequest) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator style={styles.loading} />
        </View>
      );
    }

    const canGoOnsite = serviceRequest && serviceRequest.status === 'in_the_field';
    return (
      <View style={styles.container}>
        <BannerWithNumber serviceRequest={serviceRequest} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          { canGoOnsite && <OnsiteSection {...this.props} /> }
          <ResolutionSection {...this.props} />
          <PanhandlingSection {...this.props} />
          <DetailsSection
            serviceRequest={serviceRequest}
            switchTab={switchTab}
          />
        </ScrollView>
      </View>
    );
  }
}

ServiceRequestDetailScreen.propTypes = {
	updatePanhandlingResponse: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object,
  unselectServiceRequest: PropTypes.func.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
  screenProps: PropTypes.shape({
    switchTab: PropTypes.func,
  }),
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
