import React, { Component, PropTypes } from 'react';
import { Animated, View } from 'react-native';
import CurrentResolution from './CurrentResolution';
import ResolutionPending from './ResolutionPending';
import ResolutionForm from './ResolutionForm';

export default class ResolutionSection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1 }
    ).start();
  }

  render() {
    const { serviceRequest, updatePending } = this.props;
    if (serviceRequest.status === 'on_site') {
      return (
        <ResolutionForm {...this.props} />
      );
    } else if (updatePending === 'resolved') {
      return (
        <ResolutionPending {...this.props} />
      );
    } else {
      return null;
    }
  }
}

ResolutionSection.propTypes = {
  updatePending: PropTypes.string,
  serviceRequest: PropTypes.object.isRequired,
};
