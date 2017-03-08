import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { RESOLUTION_CODES } from '../../actionTypes';

export default class ResolutionNotesField extends Component {
  constructor(props) {
    super(props);
    // this.state = { notes: null };
  }

  updateResolutionNotes(notes) {
    // this.setState({ notes });
    this.props.updateResolutionNotes(notes);
  }

  isEnabled() {
    return this.props.selectedResolutionCode
        && this.props.selectedResolutionCode === RESOLUTION_CODES.insufficient_information;
  }

  render() {
    if (this.isEnabled()) {
      return (
        <TextInput
          style={styles.input}
          onChangeText={notes => this.updateResolutionNotes(notes)}
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholder="Reason for Insufficient Information"
          value={this.props.resolutionNotes}
        />
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    paddingLeft: 20,
  }
});