/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LogoutScreen from '../components/LogoutScreen';
import * as UserActions from '../actions';

function mapStateToProps(state) {
  return {
    name: state.user.name,
    email: state.user.email,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);