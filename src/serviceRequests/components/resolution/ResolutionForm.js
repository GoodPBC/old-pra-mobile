import React, { PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import ResolutionPicker from './ResolutionPicker';
import ResolveRequestButton from './ResolveRequestButton';
import {
  Separator,
  X_AXIS_PADDING,
  LIGHT_BLUE,
} from '../../../shared';

export default function ResolutionForm(props) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
      </View>
        <ResolutionPicker {...props} />
        <Separator />
        <View style={styles.buttonContainer}>
          <Text style={styles.srNumber}>SR# {props.serviceRequest.sr_number}</Text>
          <ResolveRequestButton {...props} />
        </View>
    </View>
  );
}

ResolutionForm.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'lightgray',
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    paddingTop: 20,
    paddingBottom: 30,
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
