import React, { Component, PropTypes } from 'react';
import CurrentResolution from './CurrentResolution';
import ResolutionPending from './ResolutionPending';
import ResolutionForm from './ResolutionForm';

export default class ResolutionSection extends Component {
  componentWillMount() {
    this.props.fetchResolutionCodes();
  }

  render() {
    const { serviceRequest } = this.props;
    if (serviceRequest.resolution) {
      return <CurrentResolution serviceRequest={serviceRequest} />;
    } else if (serviceRequest.pendingResolution) {
      return <ResolutionPending {...this.props} />;
    } else if (serviceRequest.status !== 'on_site') {
      return null;
    }

    return <ResolutionForm {...this.props} />;
  }
}

ResolutionSection.propTypes = {
  fetchResolutionCodes: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object.isRequired,
};
