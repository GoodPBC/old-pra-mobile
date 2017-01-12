import React, { PropTypes } from 'react';

import {
  Button,
} from '../../../shared';

export default function ResolveRequestButton({
  serviceRequest,
  selectedResolutionCode,
  resolveServiceRequest }) {
  return (
    <Button onPress={() => resolveServiceRequest(serviceRequest, selectedResolutionCode) }>Submit</Button>
  );
}

ResolveRequestButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  selectedResolutionCode: PropTypes.string,
  resolveServiceRequest: PropTypes.func.isRequired,
};