import PropTypes from 'prop-types';
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Separator } from '../../shared';
import DescriptionSection from './DescriptionSection';
import AddressSection from './AddressSection';
import TimeSection from './TimeSection';

export default class DetailsSection extends React.PureComponent {
  render() {
    const { serviceRequest, switchTab } = this.props;

    return (
      <View style={styles.detailsContainer}>
        <TimeSection serviceRequest={serviceRequest} />
        <Separator style={styles.separator} />
        <AddressSection
          fullLength
          serviceRequest={serviceRequest}
          switchTab={switchTab}
        />
        <Separator style={styles.separator} />
        <DescriptionSection serviceRequest={serviceRequest} />
        <Separator />
      </View>
    );
  }
}

DetailsSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  switchTab: PropTypes.func,
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
