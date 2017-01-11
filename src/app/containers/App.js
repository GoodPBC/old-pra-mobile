/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { clearErrorMessage } from '../actions';
import { monitorNetworkChanges } from '../../offline/actions';

function mapStateToProps(state) {
  console.log('state', state.offline);
  return {
    apiRequestInProgress: state.app.apiRequestInProgress,
    errorMessage: state.app.errorMessage,
    networkIsConnected: state.offline.networkIsConnected,
    userIsAuthenticated: state.user.userIsAuthenticated,
  };
}

/**
 * Don't need to pass any actions to the App container.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearErrorMessage,
    monitorNetworkChanges,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
