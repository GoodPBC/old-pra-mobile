import React, { Component, PropTypes } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ResolutionSection from '../containers/ResolutionSection';
import ContactSection from '../containers/ContactSection';
import DetailsSection from './DetailsSection';
import OnsiteSection from './OnsiteSection';
import {
  DARK_BLUE,
  Separator,
  BODY_BACKGROUND
} from '../../shared';

export default class ServiceRequestDetailScreen extends Component {

  componentWillUnmount() {
    this.props.unselectServiceRequest();
  }

  render() {
    const canGoOnsite = this.props.serviceRequest.status === 'in_the_field';

    return (
      <View style={styles.container}>
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
  serviceRequest: PropTypes.object.isRequired,
  unselectServiceRequest: PropTypes.func.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
  sectionHeader: {
    color: 'gray',
    fontVariant: ['small-caps'],
  },
});
