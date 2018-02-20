// Export the list component so that we can reconfigure it for the sync screen.
import ServiceRequestList from './components/ServiceRequestList';

// Export navigation for use in the main App component.
import ServiceRequestStackNavigator from './containers/ServiceRequestStackNavigator';

// Selecting service requests on the Sync tab.
import { selectServiceRequest } from './actions';

import {
  FETCH_SERVICE_REQUESTS,
  UPDATE_ONSITE_STATUS,
  RESOLVE_SERVICE_REQUEST,
} from './actionTypes';

export {
  FETCH_SERVICE_REQUESTS,
  UPDATE_ONSITE_STATUS,
  RESOLVE_SERVICE_REQUEST,
  selectServiceRequest,
  ServiceRequestList,
  ServiceRequestStackNavigator,
};
