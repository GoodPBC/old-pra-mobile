/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapScreen from '../components/MapScreen';
import * as MapActions from '../actions';


/**
 * Map only necessary data for the 'My Requests' screen.
 */
function mapStateToProps(state) {
  return {
    test: "value"
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
