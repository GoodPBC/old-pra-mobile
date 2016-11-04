import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, View } from 'react-native';

import Separator from '../../shared/components/Separator';

function LabeledText({labelText, children}) {
  return (
    <View>
      <Text style={styles.label}>{labelText}: </Text>
      <Text>{children}</Text>
    </View>
  );
}

function SectionHeader({ children }) {
  return <Text style={styles.sectionHeader}>{children}</Text>;
}

export default class ServiceRequestDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    const { serviceRequest } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text>{serviceRequest['request_created_at']}</Text>
          <Separator />
          <SectionHeader>What</SectionHeader>
          <Text>{serviceRequest['complaint_details']}</Text>
          <SectionHeader>Where</SectionHeader>
          <LabeledText labelText={'Location Type'}>{serviceRequest['location_type']}</LabeledText>
          <LabeledText labelText={'Address'}>{serviceRequest['address']}</LabeledText>
          <LabeledText labelText={'Location Details'}>{serviceRequest['location_details']}</LabeledText>
        </View>
      </View>
    );
  }
}

ServiceRequestDetail.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64, // NavigatorIOS overlap
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
