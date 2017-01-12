import React, { PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';
import { Separator } from '../../shared';
import DescriptionSection from './DescriptionSection';
import AddressSection from './AddressSection';
import TimeSection from './TimeSection';

export default function DetailsSection({ serviceRequest }) {
  return (
    <View style={styles.detailsContainer}>
      <TimeSection serviceRequest={serviceRequest} />
      <Separator style={styles.separator} />
      <AddressSection serviceRequest={serviceRequest} fullLength />
      <Separator style={styles.separator} />
      <DescriptionSection serviceRequest={serviceRequest} />
      <Separator />
    </View>
  );
}

DetailsSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
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
  separator: {
    marginBottom: 10,
  },
});