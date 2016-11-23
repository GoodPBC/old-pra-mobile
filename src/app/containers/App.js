/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { clearErrorMessage } from '../actions';

function mapStateToProps(state) {
  return {
    apiRequestInProgress: state.app.apiRequestInProgress,
    errorMessage: state.app.errorMessage,
    userIsAuthenticated: state.user.userIsAuthenticated,
  };
}

/**
 * Don't need to pass any actions to the App container.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearErrorMessage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
