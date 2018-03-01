/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginScreen from '../components/LoginScreen';
import * as UserActions from '../actions';

function mapStateToProps(state) {
  return {
    apiRequestInProgress: state.app.apiRequestInProgress,
    networkIsConnected: state.offline.networkIsConnected,
    userIsAuthenticated: state.user.userIsAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
