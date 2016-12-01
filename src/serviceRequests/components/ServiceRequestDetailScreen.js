import React, { PropTypes } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import ResolutionSection from '../containers/ResolutionSection';
import ContactSection from '../containers/ContactSection';
import DetailsSection from './DetailsSection';
import OnsiteButton from './OnsiteButton';

export default function ServiceRequestDetailScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
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
