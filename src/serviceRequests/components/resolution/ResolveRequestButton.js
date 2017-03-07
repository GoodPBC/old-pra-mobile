import React, { PropTypes } from 'react';

import {
  Button,
} from '../../../shared';

function enableResolveButton(resolutionCodes, resolutionNotes, selectedResolutionCode) {
  const isPopulated = typeof selectedResolutionCode === 'number';
  const isInsufficient = resolutionCodes.insufficient_information === selectedResolutionCode;
  const hasNotes = resolutionNotes && resolutionNotes.length;
  const isEnabled = isPopulated && (!isInsufficient || (isInsufficient && hasNotes));
  return isEnabled;
}

export default function ResolveRequestButton({
  serviceRequest,
  selectedResolutionCode,
  resolutionCodes,
  resolutionNotes,
  resolveServiceRequest }) {

  return (
    <Button
      disabled={!enableResolveButton(resolutionCodes, resolutionNotes, selectedResolutionCode)}
      onPress={() => resolveServiceRequest(serviceRequest, selectedResolutionCode) }
    >Submit</Button>
  );
}

ResolveRequestButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  selectedResolutionCode: PropTypes.string,
  resolveServiceRequest: PropTypes.func.isRequired,
};