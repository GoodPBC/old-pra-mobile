import React, { Component, PropTypes } from 'react';

import { Picker, StyleSheet, Text, View } from 'react-native';

import {
  Button,
  Separator,
  X_AXIS_PADDING,
  GRAY_TEXT,
  LIGHT_BLUE,
} from '../../shared';

function CurrentResolution({ serviceRequest }) {
  const resDate = new Date(serviceRequest.resolution.reported_at);
  const resDateDisplay = resDate.getHours() + ':' + resDate.getMinutes() + ', ' + resDate.toDateString();
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
        <Text>Service Request Resolved</Text>
        <Text>Status Code: {serviceRequest.resolution.resolution_code}</Text>
        <Text>Resolved At: {resDateDisplay}</Text>
      </View>
    </View>
  );
}

CurrentResolution.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

function ResolutionPending() {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
        <Text>Resolution submission pending</Text>
      </View>
    </View>
  );
}

ResolutionPending.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

function ResolutionForm(props) {
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

ResolutionSection.propTypes = {
  fetchResolutionCodes: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object.isRequired,
};

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
  selectedResolutionCode: PropTypes.string,
  resolveServiceRequest: PropTypes.func.isRequired,
};

function ResolutionPicker({
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
    paddingBottom: 10,
    marginBottom: 10
  },
});