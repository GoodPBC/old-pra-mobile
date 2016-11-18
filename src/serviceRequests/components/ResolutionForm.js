import React, { Component, PropTypes } from 'react';

import { Picker, StyleSheet, Text, View } from 'react-native';

import {
  Button,
  Separator,
  X_AXIS_PADDING,
} from '../../shared';

export default class ResolutionForm extends Component {
  componentWillMount() {
    this.props.fetchResolutionCodes();
  }

  render() {
    const { serviceRequest } = this.props;
    if (serviceRequest.resolution) {
      return <Text>RESOLVED with code {serviceRequest.resolution.resolution_code} since {serviceRequest.resolution.reported_at}</Text>
    } else {
      return (
        <View>
          <ResolutionPicker {...this.props} />
          <Separator />
          <View style={styles.buttonContainer}>
            <Text style={styles.srNumber}>SR# {serviceRequest.original_request_number}</Text>
            <ResolveRequestButton {...this.props} />
          </View>
        </View>
      );
    }
  }
}

function ResolveRequestButton({ serviceRequest, selectedResolutionCode, resolveServiceRequest }) {
  return (
    <Button onPress={() => resolveServiceRequest(serviceRequest, selectedResolutionCode) }>Submit</Button>
  );
}

function ResolutionPicker({
  serviceRequest,
  resolutionCodes,
  selectedResolutionCode,
  selectServiceRequestResolution }) {
  const options = resolutionCodes.map((obj) => {
    return <Picker.Item value={obj.code} label={obj.display_name} key={obj.code} />
  });

  return (
    <Picker onValueChange={selectServiceRequestResolution} selectedValue={selectedResolutionCode}>
      {options}
    </Picker>
  );
}

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
  }
});