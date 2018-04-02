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
      disableSaveButton: true,
      saveButtonText: 'Save',
      panhandling: props.serviceRequest.is_client_panhandling,
      summary: props.serviceRequest.interaction_summary,
    };
    this.shouldDisableSaveButton = this.shouldDisableSaveButton.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prevStatus = this.props.serviceRequest.panhandlingResponseRequestStatus;
    const nextStatus = nextProps.serviceRequest.panhandlingResponseRequestStatus;
    if (prevStatus !== nextStatus) {
      if (nextStatus === 'success') {
        this.setState({ saveButtonText: 'Saved' });
      } else if (nextStatus === 'failure') {
        this.setState({ saveButtonText: 'Try Again' });
      } else {
        this.setState({ saveButtonText: 'Save' });
      }
    }
  }

  shouldDisableSaveButton() {
    const { serviceRequest } = this.props;
    const { disableSaveButton } = this.state;

    return (
      serviceRequest.panhandlingResponseRequestStatus !== 'failure'
      && disableSaveButton
    );
  }

  isLoading() {
    const { serviceRequest } = this.props;
    return serviceRequest.panhandlingResponseRequestStatus === 'in_progress';
  }

  onSelect(value) {
    this.setState({
      disableSaveButton: false,
      panhandling: value
    });
  }

  onChangeText(value) {
    this.setState({
      disableSaveButton: false,
      summary: value,
    });
  }

  onSave() {
    const { panhandling, summary } = this.state;
    this.setState({ disableSaveButton: true });
    Keyboard.dismiss();
    this.props.updatePanhandlingResponse(
      this.props.serviceRequest,
      {
        isClientPanhandling: panhandling,
        interactionSummary: summary,
        modifiedAt: moment(),
      }
    );
  }

  render() {
    const { serviceRequest } = this.props;

    if (serviceRequest.status === 'in_the_field') {
      return null;
    }

    const options = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>Is the client pan-handling?</Text>
          <View style={styles.radioFormContainer}>
            <RadioForm
              formHorizontal
            >
              {
                options.map((option, i) => (
                  <RadioButton key={i}>
                    <RadioButtonLabel
                      obj={option}
                      onPress={this.onSelect}
                      labelWrapStyle={{ marginRight: 10 }}
                    />
                    <RadioButtonInput
                      obj={option}
                      isSelected={this.state.panhandling === option.value}
                      onPress={this.onSelect}
                      borderWidth={1}
                      buttonInnerColor={DARK_GRAY}
                      buttonOuterColor={DARK_GRAY}
                      buttonSize={15}
                      buttonWrapStyle={{ marginRight: 50 }}
                    />
                  </RadioButton>
                ))
              }
            </RadioForm>
          </View>
          <Text>Write a brief summary of the interaction</Text>
          <TextInput
            multiline
            style={styles.textInput}
            onChangeText={this.onChangeText}
            placeholder="Enter your summary here"
            value={this.state.summary}
          />
          <Button
            style={{ height: 40, marginTop: 10 }}
            textStyle={{ fontSize: 18 }}
            onPress={this.onSave}
            loading={this.isLoading()}
            disabled={this.shouldDisableSaveButton()}
          >
            {this.state.saveButtonText}
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

