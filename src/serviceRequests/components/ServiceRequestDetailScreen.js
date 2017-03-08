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

function BannerWithNumber({ serviceRequest }) {
  return (
    <View>
      <Separator />
      <Text style={styles.banner}>SR #{serviceRequest.sr_number}</Text>
    </View>
  );
}

export default class ServiceRequestDetailScreen extends Component {

  componentWillUnmount() {
    this.props.unselectServiceRequest();
  }

  render() {
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
  serviceRequest: PropTypes.object.isRequired,
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
  sectionHeader: {
    color: 'gray',
    fontVariant: ['small-caps'],
  },
});