import React, { PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';

import {
  DARK_BLUE,
  Separator,
} from '../../shared';


import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


export default class UrgentServiceRequestModalItemResolutionPicker extends React.Component {
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
    this.props.updateServiceRequestReason(value);
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const reasons = ['enroute', 'traffic', 'forgot']
    const reasonDisplayNames = {
      enroute: 'Enroute',
      traffic: 'Traffic',
      forgot: 'Forgot'
    }

    return (
      <RadioForm animation={false} formHorizontal={false}>
        {
          reasons.map((reason, i) => {
            const isSelected = this.props.selectedReason === reason;
            const labelWithValue = { label: reasonDisplayNames[reason], value: reason };
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
                      labelStyle={{ fontSize: 14, color: 'black' }}
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
    marginTop: 10,
    marginBottom: 10,
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