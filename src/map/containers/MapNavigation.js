/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapNavigation from '../components/MapNavigation';
import * as MapActions from '../actions';
import * as ServiceRequestActions from '../../serviceRequests/actions';
import {
  getActiveServiceRequests,
  getInactiveServiceRequests,
} from '../../serviceRequests/selectors';


/**
 * Map only necessary data for the 'My Requests' screen.
 */
function mapStateToProps(state) {
  return {
    activeServiceRequests: getActiveServiceRequests(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapNavigation);