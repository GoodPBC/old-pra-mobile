import React, { Component, PropTypes } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';
import { Button, Separator } from '../../shared';

export default function OnsiteButton({ serviceRequest, updateOnsiteStatus }) {
  if (serviceRequest.onsite_status) {
    return <Text>ONSITE since {serviceRequest.onsite_status.reported_at}</Text>;
  } else {
    return <Button onPress={() => updateOnsiteStatus(serviceRequest)}>Onsite</Button>;
  }
}