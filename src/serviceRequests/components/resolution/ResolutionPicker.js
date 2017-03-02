import React, { PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {
  DARK_BLUE,
  GRAY_TEXT,
  Separator,
} from '../../../shared';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default class ResolutionPicker extends React.Component {
  // const options = resolutionCodes.map((obj) => <Picker.Item value={obj.code} label={obj.display_name} key={obj.code} />);
  // const options = resolutionCodes.map((obj) => <Picker.Item value={obj.code} label={obj.display_name} key={obj.code} />);

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };

    this.setIndexAndSelectResolution = this.setIndexAndSelectResolution.bind(this);
  }

  resolutionCodeDisplayName(resolutionCode) {
    switch (resolutionCode) {
      case 'assistance_offered': return 'Assistance Offered';
      case 'insufficient_information': return 'Insufficient Information';
      case 'person_not_found': return 'Person not found';
      case 'referred_to_911': return 'Referred to 911';
      case 'refused_assistance': return 'Refused Assistance';
      default:
        return 'Unknown resolution code';
    }
  }

  setIndexAndSelectResolution(value, index) {
    this.props.selectServiceRequestResolution(value);
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const resolutionCodeNames = Object.keys(this.props.resolutionCodes);
    return (
      <RadioForm animation={false} formHorizontal={false}>
        {
          resolutionCodeNames.map((resolutionCodeName, i) => {
            const isSelected = this.state.selectedIndex === i;
            const labelWithValue = { label: this.resolutionCodeDisplayName(resolutionCodeName), value: this.props.resolutionCodes[resolutionCodeName] };
            return (
              <View key={i}>
                <Separator />
                <RadioButton key={i} style={styles.buttonWrapStyle} >
                  <RadioButtonInput
                      obj={labelWithValue}
                      index={i}
                      isSelected={ isSelected }
                      onPress={(value, index) => { this.setIndexAndSelectResolution(value, index); }}
                      buttonInnerColor={DARK_BLUE}
                      buttonOuterColor={'lightgray'}
                      buttonSize={10}
                      buttonStyle={{}}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={labelWithValue}
                      index={i}
                      labelHorizontal
                      onPress={(value, index) => { this.setIndexAndSelectResolution(value, index); }}
                      labelStyle={{ fontSize: 16, color: GRAY_TEXT, fontWeight: 'bold' }}
                      labelWrapStyle={{}}
                    />
                </RadioButton>
              </View>
            );
          })
        }
      </RadioForm>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapStyle: {
    marginTop: 15,
    marginBottom: 15
  },
  radioStyle: {
    borderBottomWidth: 1,
    borderColor: '#2196f3',
    paddingRight: 10
  },
  radioButtonWrap: {
    marginRight: 5,
    marginLeft: 20
  },
});

ResolutionPicker.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  resolutionCodes: PropTypes.array.isRequired,
  selectedResolutionCode: PropTypes.any,
  selectServiceRequestResolution: PropTypes.func.isRequired,
};