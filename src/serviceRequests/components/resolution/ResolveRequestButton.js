import React, { PropTypes } from 'react';

import {
  Button,
  InvertButton,
} from '../../../shared';

import { RESOLUTION_CODES } from '../../actionTypes';

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
  resolutionNotes,
  resolveServiceRequest }) {
  return (
    <InvertButton
      withBorder
      disabled={!enableResolveButton(RESOLUTION_CODES, resolutionNotes, selectedResolutionCode)}
      onPress={() => resolveServiceRequest(serviceRequest, selectedResolutionCode) }
    >Add Resolution</InvertButton>
  );
}

ResolveRequestButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  selectedResolutionCode: PropTypes.number,
  resolutionNotes: PropTypes.string,
  resolveServiceRequest: PropTypes.func.isRequired,
};