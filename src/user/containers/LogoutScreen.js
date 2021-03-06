/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LogoutScreen from '../components/LogoutScreen';
import * as UserActions from '../actions';

function mapStateToProps(state) {
  return {
    apiRequestInProgress: state.app.apiRequestInProgress,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
