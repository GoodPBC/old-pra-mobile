import React, { PropTypes } from 'react';

import { Picker, StyleSheet, Text, View } from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default function ResolutionPicker({
  resolutionCodes,
  selectedResolutionCode,
  selectServiceRequestResolution }) {
  //const options = resolutionCodes.map((obj) => <Picker.Item value={obj.code} label={obj.display_name} key={obj.code} />);
  var radio_props = [
    {label: 'Assistance Offered', value: 'assistance_offered' },
    {label: 'Insufficient Information', value: 'insufficient_information' },
    {label: 'Person Not Found', value: 'person_not_found' },
    {label: 'Referred to 911', value: 'referred_to_911' },
    {label: 'Refused Assistance', value: 'refused_assistance' },
  ];

  return (
    <RadioForm
      radio_props={radio_props}
      initial={'assistance_offered'}
      onPress={(value) => { selectServiceRequestResolution(value) } }
      animation={false}
    />
    );
    {/*
      <Picker onValueChange={selectServiceRequestResolution} selectedValue={selectedResolutionCode}>
      {options}
    </Picker>
    */}
}

ResolutionPicker.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  resolutionCodes: PropTypes.array.isRequired,
  selectedResolutionCode: PropTypes.any,
  selectServiceRequestResolution: PropTypes.func.isRequired,
};