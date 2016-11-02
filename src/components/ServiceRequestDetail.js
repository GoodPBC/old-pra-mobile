import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, View } from 'react-native';

export default class ServiceRequestDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <p>This is the service request detail filler page</p>
    );
  }
}

ServiceRequestDetail.propTypes = {

};
