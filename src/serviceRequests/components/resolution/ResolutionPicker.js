import PropTypes from 'prop-types';
import React from 'react';

import { StyleSheet, View } from 'react-native';

import {
  DARK_BLUE,
  Separator,
} from '../../../shared';

import { RESOLUTION_CODES } from '../../actionTypes';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { resolutionCodeDisplayName } from '../../helpers';

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

  setIndexAndSelectResolution(value, index) {
    this.props.selectServiceRequestResolution(value);
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const resolutionCodes = Object.values(RESOLUTION_CODES);
    console.log('resolution codes', RESOLUTION_CODES);
    return (
      <RadioForm animation={false} formHorizontal={false}>
        {
          resolutionCodes.map((resolutionCode, i) => {
            const isSelected = this.props.selectedResolutionCode === resolutionCode;
            const labelWithValue = { label: resolutionCodeDisplayName(resolutionCode), value: resolutionCode };
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
                    buttonWrapStyle={{ marginRight: 10 }}
                  />
                  <RadioButtonLabel
                    obj={labelWithValue}
                    index={i}
                    labelHorizontal
                    onPress={(value, index) => { this.setIndexAndSelectResolution(value, index); }}
                    labelStyle={{ fontSize: 18, color: 'black' }}
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
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
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
  selectedResolutionCode: PropTypes.any,
  selectServiceRequestResolution: PropTypes.func.isRequired,
};