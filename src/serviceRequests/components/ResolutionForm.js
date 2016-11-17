import React, { Component, PropTypes } from 'react';

import { Picker, StyleSheet, Text, View } from 'react-native';

import { Button, Separator } from '../../shared';

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
          <ResolveRequestButton {...this.props} />
        </View>
      );
    }
  }
}

function ResolveRequestButton({ serviceRequest, selectedResolutionCode, resolveServiceRequest }) {
  return <Button onPress={() => resolveServiceRequest(serviceRequest, selectedResolutionCode) }>Submit Resolution</Button>;
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