import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import moment from 'moment';
import {
  Button,
  Separator,
  DARK_GRAY,
  LIGHT_GRAY,
} from '../../shared';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  innerContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  radioFormContainer: {
    paddingVertical: 10,
  },
  textInput: {
    height: 80,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingTop: Platform.OS === 'ios' ? 5 : -40,
    paddingLeft: 5,
    paddingBottom: 0,
    marginTop: 5,
    borderRadius: 6,
  }
});

export default class PanhandlingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      saveInProgress: false,
      saveButtonText: 'Save',
      isClientPanhandling: props.serviceRequest.is_client_panhandling,
      interactionSummary: props.serviceRequest.interaction_summary,
    };
    this.shouldDisableButton = this.shouldDisableButton.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
    this.renderRadioFormButtons = this.renderRadioFormButtons.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevStatus = this.props.serviceRequest.panhandlingResponseRequestStatus;
    const nextStatus = nextProps.serviceRequest.panhandlingResponseRequestStatus;
    if (prevStatus !== nextStatus) {
      if (nextStatus === 'success') {
        this.setState({ saveInProgress: false, saveButtonText: 'Saved', isDirty: false });
      } else if (nextStatus === 'failure') {
        this.setState({ saveInProgress: false, saveButtonText: 'Try Again' });
      } else if (nextStatus === 'in_progress') {
        this.setState({ saveInProgress: true });
      }
    }
  }
  
  onSelect(isClientPanhandling) {
    const { interactionSummary, saveInProgress } = this.state;
    const { interaction_summary, is_client_panhandling } = this.props.serviceRequest;

    const isDirty = (
      isClientPanhandling !== is_client_panhandling
      || interactionSummary !== interaction_summary
    );
    this.setState({ isDirty, isClientPanhandling });
  }

  onChangeText(interactionSummary) {
    const { isClientPanhandling } = this.state;
    const { interaction_summary, is_client_panhandling } = this.props.serviceRequest;

    const isDirty = (
      isClientPanhandling !== is_client_panhandling
      || interactionSummary !== interaction_summary
    );
    this.setState({ isDirty, interactionSummary });
  }

  onSave() {
    const { isClientPanhandling, interactionSummary } = this.state;
    this.props.updatePanhandlingResponse(
      this.props.serviceRequest,
      {
        isClientPanhandling,
        interactionSummary,
        modifiedAt: moment(),
      }
    );
    Keyboard.dismiss();
  }

  shouldDisableButton() {
    const { isDirty, saveInProgress } = this.state;
    return saveInProgress || !isDirty;
  }

  renderRadioFormButtons() {
    const { saveInProgress } = this.state;

    const options = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ];

    return options.map((option, i) => (
      <RadioButton key={i}>
        <RadioButtonLabel
          disabled={saveInProgress}
          obj={option}
          onPress={this.onSelect}
          labelWrapStyle={{ marginRight: 10 }}
        />
        <RadioButtonInput
          disabled={saveInProgress}
          obj={option}
          isSelected={this.state.isClientPanhandling === option.value}
          onPress={this.onSelect}
          borderWidth={1}
          buttonInnerColor={saveInProgress ? LIGHT_GRAY : DARK_GRAY}
          buttonOuterColor={saveInProgress ? LIGHT_GRAY : DARK_GRAY}
          buttonSize={15}
          buttonWrapStyle={{ marginRight: 50 }}
        />
      </RadioButton>
    ));
  }

  render() {
    const { isDirty, saveInProgress } = this.state;
    const { serviceRequest } = this.props;

    if (serviceRequest.status === 'in_the_field') {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>Is the client pan-handling?</Text>
          <View style={styles.radioFormContainer}>
            <RadioForm formHorizontal>
              {this.renderRadioFormButtons()}
            </RadioForm>
          </View>
          <Text>Write a brief summary of the interaction</Text>
          <TextInput
            multiline
            editable={!saveInProgress}
            style={styles.textInput}
            onChangeText={this.onChangeText}
            placeholder="Enter your summary here"
            value={this.state.summary}
          />
          <Button
            style={{ height: 40, marginTop: 10 }}
            textStyle={{ fontSize: 18 }}
            onPress={this.onSave}
            loading={saveInProgress}
            disabled={this.shouldDisableButton()}
          >
            {isDirty ? 'Save' : this.state.saveButtonText}
          </Button>
        </View>
        <Separator />
      </View>
    );
  }
}

PanhandlingSection.propTypes = {
  navigation: PropTypes.object,
  serviceRequest: PropTypes.object.isRequired,
};

