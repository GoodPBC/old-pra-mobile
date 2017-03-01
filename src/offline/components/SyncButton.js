import React, { PropTypes } from 'react';

import { InvertButton } from '../../shared';

export default function SyncButton({ syncServiceRequests }) {
  return <InvertButton onPress={syncServiceRequests} withBorder>Sync All</InvertButton>;
}

SyncButton.propTypes = {
  syncServiceRequests: PropTypes.func.isRequired,
};
