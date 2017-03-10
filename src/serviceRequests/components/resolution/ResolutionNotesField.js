import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { RESOLUTION_CODES } from '../../actionTypes';
import {
  X_AXIS_PADDING,
} from '../../../shared';

export default class ResolutionNotesField extends Component {
  updateResolutionNotes(notes) {
    this.props.updateResolutionNotes(notes);
  }

  isEnabled() {
    return this.props.selectedResolutionCode
        && this.props.selectedResolutionCode === RESOLUTION_CODES.insufficient_information;
  }

  render() {
    if (this.isEnabled()) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={notes => this.updateResolutionNotes(notes)}
            autoCorrect={false}
            autoCapitalize={'none'}
            placeholder="Reason for Insufficient Information*"
            value={this.props.resolutionNotes}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    paddingBottom: 20,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingLeft: 5,
    paddingTop: Platform.OS === 'ios' ? 5 : -40,
    paddingBottom: 0,
    fontSize: 14,
  }
});