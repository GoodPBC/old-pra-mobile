import React, { Component, PropTypes } from 'react';
import { Animated, View } from 'react-native';
import ResolutionForm from './ResolutionForm';

export default class ResolutionScreen extends Component {
  render() {
    return <ResolutionForm {...this.props} />;
  }
}

ResolutionScreen.propTypes = {
  updatePending: PropTypes.string,
  serviceRequest: PropTypes.object.isRequired,
};
