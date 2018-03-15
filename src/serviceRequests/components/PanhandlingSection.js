import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
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
      selectedValue: null,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    this.setState({ selectedValue: value });
  }

  render() {
    const { serviceRequest } = this.props;

    if (serviceRequest.status === 'in_the_field') {
      return null;
    }

    const options = [
      { label: 'Yes', value: 'YesValue' },
      { label: 'No', value: 'NoValue' },
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
                      isSelected={this.state.selectedValue === option.value}
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
            onChangeText={notes => this.updateResolutionNotes(notes)}
            placeholder="Enter your summary here"
            value={this.props.resolutionNotes}
          />
          <Button
            style={{ height: 40, marginTop: 10 }}
            onPress={() => {
              Alert.alert(
                'Thank you!',
                'But it doesn\'t actually save it yet!'
              );
            }}
          >
            Save
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

