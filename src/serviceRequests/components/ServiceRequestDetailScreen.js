import React, { PropTypes } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ResolutionSection from '../containers/ResolutionSection';
import ContactSection from '../containers/ContactSection';
import DetailsSection from './DetailsSection';
import OnsiteButton from './OnsiteButton';
import {
  DARK_BLUE,
} from '../../shared';

function BannerWithNumber({ serviceRequest }) {
  return <Text style={styles.banner}>SR #{serviceRequest.sr_number}</Text>;
}

export default function ServiceRequestDetailScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <BannerWithNumber serviceRequest={props.serviceRequest} />
        <OnsiteButton {...props} />
        <DetailsSection serviceRequest={props.serviceRequest} />
        <ContactSection {...props} />
        <ResolutionSection />
      </ScrollView>
    </View>
  );
}

ServiceRequestDetailScreen.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
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
