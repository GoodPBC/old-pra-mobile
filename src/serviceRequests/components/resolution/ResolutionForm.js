import PropTypes from 'prop-types';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import ResolutionNotesField from './ResolutionNotesField';
import ResolutionPicker from './ResolutionPicker';
import ResolveRequestButton from './ResolveRequestButton';
import { resolutionCodeDisplayName } from '../../helpers';
import {
  Separator,
  X_AXIS_PADDING,
  LIGHT_BLUE,
} from '../../../shared';

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

class ResolutionForm extends React.Component {
  constructor(props) {
    super(props);
    this.resolveAndGoBack = this.resolveAndGoBack.bind(this);
  }

  resolveAndGoBack(serviceRequest, selectedResolutionCode) {
    const description = `Are you sure you want to resolve this SR with status: ${resolutionCodeDisplayName(selectedResolutionCode)}`;
    Alert.alert(
      'Confirm Resolution',
      description,
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.resolveServiceRequest(serviceRequest, selectedResolutionCode);
            this.props.navigation.goBack();
          },
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContainerInner}>
          <Text style={styles.header}>Select a Resolution Below</Text>
        </View>
        <ResolutionPicker {...this.props} />
        <ResolutionNotesField {...this.props} />
        <Separator />
        <View style={styles.buttonContainer}>
          <ResolveRequestButton {...this.props} resolveServiceRequest={this.resolveAndGoBack} />
        </View>
      </View>
    );
  }
}

ResolutionForm.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

export default withNavigation(ResolutionForm);
