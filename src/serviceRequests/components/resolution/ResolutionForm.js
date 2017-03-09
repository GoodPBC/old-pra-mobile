import React, { PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import ResolutionNotesField from './ResolutionNotesField';
import ResolutionPicker from './ResolutionPicker';
import ResolveRequestButton from './ResolveRequestButton';
import {
  Separator,
  X_AXIS_PADDING,
  LIGHT_BLUE,
  CARD_BORDER
} from '../../../shared';

function resolveAndGoBack({ resolveServiceRequest, navigator }) {
  return (serviceRequest, selectedResolutionCode) => {
    resolveServiceRequest(serviceRequest, selectedResolutionCode);
    navigator.pop();
  }
}

export default function ResolutionForm(props) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
      </View>
        <ResolutionPicker {...props} />
        <ResolutionNotesField {...props} />
        <Separator />
        <View style={styles.buttonContainer}>
          <Text style={styles.srNumber}>SR# {props.serviceRequest.sr_number}</Text>
          <ResolveRequestButton {...props} resolveServiceRequest={resolveAndGoBack(props)} />
        </View>
    </View>
  );
}

ResolutionForm.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    paddingTop: 20,
    paddingBottom: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: CARD_BORDER,
    marginTop: 5
  },
  srNumber: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  header: {
    color: LIGHT_BLUE,
    marginBottom: 3,
  },
  detailsContainer: {
    padding: 10,
  },
  detailsContainerInner: {
    paddingLeft: 30,
    paddingBottom: 10
  },
});
