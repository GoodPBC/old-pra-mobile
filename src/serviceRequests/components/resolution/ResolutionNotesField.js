import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { RESOLUTION_CODES } from '../../actionTypes';
import {
  Separator,
  X_AXIS_PADDING,
  LIGHT_BLUE,
  CARD_BORDER
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
    borderColor: 'gray',
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 14,
  }
});