import React, { Component, PropTypes } from 'react';

import { ListView, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Separator } from '../../shared';
import ResolutionForm from '../containers/ResolutionForm';
import DetailsSection from './DetailsSection';
import OnsiteButton from './OnsiteButton';

export default class ServiceRequestDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <OnsiteButton {...this.props} />
          <DetailsSection serviceRequest={serviceRequest} />
          <ResolutionForm />
        </ScrollView>
      </View>
    );
  }
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
    fontVariant: ['small-caps']
  }
});
