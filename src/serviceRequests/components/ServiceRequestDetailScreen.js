import React, { Component, PropTypes } from 'react';

import { ListView, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Separator } from '../../shared';
import ResolutionForm from './ResolutionForm';

function LabeledText({labelText, children}) {
  return (
    <View>
      <Text style={styles.label}>{labelText}: </Text>
      <Text>{children}</Text>
    </View>
  );
}

function OnsiteButton({ serviceRequest, updateOnsiteStatus }) {
  if (serviceRequest.onsite_status) {
    return <Text>ONSITE since {serviceRequest.onsite_status.reported_at}</Text>;
  } else {
    return <Button onPress={() => updateOnsiteStatus(serviceRequest)}>Onsite</Button>;
  }
}


function SectionHeader({ children }) {
  return <Text style={styles.sectionHeader}>{children}</Text>;
}

export default class ServiceRequestDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchResolutionCodes();
  }

  render() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.detailsContainer}>
            <OnsiteButton {...this.props} />
            <Separator />
            <Text>{serviceRequest['request_created_at']}</Text>
            <Separator />
            <SectionHeader>What</SectionHeader>
            <Text>{serviceRequest['complaint_details']}</Text>
            <SectionHeader>Where</SectionHeader>
            <LabeledText labelText={'Location Type'}>{serviceRequest['location_type']}</LabeledText>
            <LabeledText labelText={'Address'}>{serviceRequest['address']}</LabeledText>
            <LabeledText labelText={'Location Details'}>{serviceRequest['location_details']}</LabeledText>
            <Separator />
            <ResolutionForm {...this.props} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

ServiceRequestDetailScreen.propTypes = {
  fetchResolutionCodes: PropTypes.func.isRequired,
  resolutionCodes: PropTypes.array.isRequired,
  resolveServiceRequest: PropTypes.func.isRequired,
  selectedResolutionCode: PropTypes.string,
  selectServiceRequestResolution: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
    marginBottom: 50, // Otherwise we can't scroll to the button at the bottom
  },
  label: {
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: 'gray',
    fontVariant: ['small-caps']
  }
});
