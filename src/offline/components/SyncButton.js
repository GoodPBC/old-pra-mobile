import React, { Component, PropTypes } from 'react';

import { Button } from '../../shared';

export default function SyncButton({ syncServiceRequests }) {
  return <Button onPress={syncServiceRequests}>Sync All</Button>;
}
