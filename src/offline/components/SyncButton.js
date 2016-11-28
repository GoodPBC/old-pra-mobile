import React, { PropTypes } from 'react';

import { Button } from '../../shared';

export default function SyncButton({ syncServiceRequests }) {
  return <Button onPress={syncServiceRequests}>Sync All</Button>;
}

SyncButton.propTypes = {
  syncServiceRequests: PropTypes.func.isRequired,
};
