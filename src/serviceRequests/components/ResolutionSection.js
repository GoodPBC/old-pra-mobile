import React, { Component, PropTypes } from 'react';

import { Picker, StyleSheet, Text, View } from 'react-native';

import {
  Button,
  Separator,
  X_AXIS_PADDING,
} from '../../shared';

function CurrentResolution({ serviceRequest }) {
  return (
    <Text>RESOLVED with code {serviceRequest.resolution.resolution_code}
      since {serviceRequest.resolution.reported_at}</Text>
  );
}

CurrentResolution.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

function ResolutionPending() {
  return <Text>Resolution submission pending</Text>;
}

ResolutionPending.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

function ResolutionForm(props) {
  return (
    <View>
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

export default class ResolutionSection extends Component {
  componentWillMount() {
    this.props.fetchResolutionCodes();
  }

  render() {
    const { serviceRequest } = this.props;
    if (serviceRequest.resolution) {
      return <CurrentResolution serviceRequest={serviceRequest} />;
    } else if (serviceRequest.pendingResolution) {
      return <ResolutionPending {...this.props} />;
    }

    return <ResolutionForm {...this.props} />;
  }
}

function ResolveRequestButton({
  serviceRequest,
  selectedResolutionCode,
  resolveServiceRequest }) {
  return (
    <Button onPress={() => resolveServiceRequest(serviceRequest, selectedResolutionCode) }>Submit</Button>
  );
}

ResolveRequestButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

function ResolutionPicker({
  serviceRequest,
  resolutionCodes,
  selectedResolutionCode,
  selectServiceRequestResolution }) {
  const options = resolutionCodes.map((obj) => <Picker.Item value={obj.code} label={obj.display_name} key={obj.code} />);

  return (
    <Picker onValueChange={selectServiceRequestResolution} selectedValue={selectedResolutionCode}>
      {options}
    </Picker>
  );
}

ResolutionPicker.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  resolutionCodes: PropTypes.array.isRequired,
  selectedResolutionCode: PropTypes.any,
  selectServiceRequestResolution: PropTypes.func.isRequired,
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
  }
});