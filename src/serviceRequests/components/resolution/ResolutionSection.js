import React, { Component, PropTypes } from 'react';
import { Animated, View } from 'react-native';
import CurrentResolution from './CurrentResolution';
import ResolutionPending from './ResolutionPending';
import ResolutionForm from './ResolutionForm';

export default class ResolutionSection extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fadeAnim: new Animated.Value(0)
    }
  }

  componentWillMount() {
    this.props.fetchResolutionCodes();
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
  }

  render() {
    const { serviceRequest }  = this.props;
    if (serviceRequest.resolution) {
      return null;
    } else if (serviceRequest.pendingResolution) {
      return (
        <ResolutionPending {...this.props} />
      )
    }
    else if (serviceRequest.status !== 'on_site') {
      return null;
    }

    return (
      <ResolutionForm {...this.props} />
    )
  }
}

ResolutionSection.propTypes = {
  fetchResolutionCodes: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object.isRequired,
};
