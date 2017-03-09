import React, { PropTypes } from 'react';

import { InvertButton } from '../../shared';

export default function SyncButton({ buttonEnabled, syncServiceRequests }) {
  return (
    <InvertButton
      disabled={!buttonEnabled}
      onPress={syncServiceRequests}
      withBorder
    >Sync All</InvertButton>
  );
}

SyncButton.propTypes = {
  syncServiceRequests: PropTypes.func.isRequired,
};
