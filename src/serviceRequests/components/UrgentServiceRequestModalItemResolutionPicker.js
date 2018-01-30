import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
  DARK_BLUE,
  Separator,
} from '../../shared';

export default class UrgentServiceRequestModalItemResolutionPicker extends React.Component {
  render() {
    const { responseReasons } = this.props;
    return (
      <RadioForm animation={false}>
        {
          Object.keys(responseReasons).map(id => {
            const radioButtonProps = {
              obj: { value: id, label: responseReasons[id] },
              index: id,
              onPress: this.props.updateServiceRequestReason,
            };
            return (
              <View key={id}>
                <Separator />
                <RadioButton key={id} style={styles.buttonWrapStyle}>
                  <RadioButtonInput
                    {...radioButtonProps}
                    isSelected={this.props.selectedReasonId === id}
                    buttonInnerColor={DARK_BLUE}
                    buttonOuterColor={'lightgray'}
                    buttonSize={10}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    {...radioButtonProps}
                    labelHorizontal={true}
                    labelStyle={{ fontSize: 14, color: 'black' }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              </View>
            );
          })
        }
        <Separator />
      </RadioForm>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapStyle: {
    marginTop: 10,
    marginBottom: 10,
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