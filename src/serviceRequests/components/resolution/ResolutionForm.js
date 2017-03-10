import React, { PropTypes } from 'react';

import { Alert, StyleSheet, Text, View } from 'react-native';

import ResolutionNotesField from './ResolutionNotesField';
import ResolutionPicker from './ResolutionPicker';
import ResolveRequestButton from './ResolveRequestButton';
import { resolutionCodeDisplayName } from '../../helpers';
import {
  Separator,
  X_AXIS_PADDING,
  LIGHT_BLUE,
} from '../../../shared';

function resolveAndGoBack({ resolveServiceRequest, navigator }) {
  return (serviceRequest, selectedResolutionCode) => {
    const description = `Are you sure you want to resolve this SR with status: ${resolutionCodeDisplayName(selectedResolutionCode)}`;
    Alert.alert(
      'Confirm Resolution',
      description,
      [
        { text: 'Yes',
          onPress: () => {
            resolveServiceRequest(serviceRequest, selectedResolutionCode);
            navigator.pop();
        } },
        { text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  };
}

export default function ResolutionForm(props) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Select a Resolution Below</Text>
      </View>
        <ResolutionPicker {...props} />
        <ResolutionNotesField {...props} />
        <Separator />
        <View style={styles.buttonContainer}>
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
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    paddingTop: 20,
    paddingBottom: 30,
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
    backgroundColor: 'white',
  },
  detailsContainerInner: {
    paddingLeft: 30,
    paddingBottom: 10
  },
});
