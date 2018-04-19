/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapScreen from '../components/MapScreen';
import { gaTrackPressEvent } from '../../app/actions';
import * as ServiceRequestActions from '../../serviceRequests/actions';
import {
  getActiveServiceRequests,
  getInactiveServiceRequests,
} from '../../serviceRequests/selectors';
import * as MapActions from '../actions';


/**
 * Map only necessary data for the 'My Requests' screen.
 */
function mapStateToProps(state) {
  return {
    context: state.app.selectedTabContext,
    activeServiceRequests: getActiveServiceRequests(state),
    generalCanvassingData: state.map.generalCanvassing.allSurveys,
    intensiveCanvassingData: state.map.intensiveCanvassing.allSurveys,
    jointOperationsData: state.map.jointOperations.allSurveys,
    panhandlingData: state.map.panhandling.allSurveys,
    userPosition: {
      latitude: state.user.latitude,
      longitude: state.user.longitude,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    gaTrackPressEvent,
    ...MapActions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
