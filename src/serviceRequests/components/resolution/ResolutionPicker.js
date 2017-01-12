import React, { PropTypes } from 'react';

import { Picker, StyleSheet, Text, View } from 'react-native';

export default function ResolutionPicker({
  resolutionCodes,
  selectedResolutionCode,
  selectServiceRequestResolution }) {
  const options = resolutionCodes.map((obj) => <Picker.Item value={obj.code} label={obj.display_name} key={obj.code} />);

  return (
    <Picker onValueChange={selectServiceRequestResolution} selectedValue={selectedResolutionCode}>
      {options}
    </Picker>
  );
}

ResolutionPicker.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  resolutionCodes: PropTypes.array.isRequired,
  selectedResolutionCode: PropTypes.any,
  selectServiceRequestResolution: PropTypes.func.isRequired,
};