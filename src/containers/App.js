/**
 * StreetSmart
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProviderResponseApp from '../components/ProviderResponseApp';
import * as AllActions from '../actions';

function mapStateToProps(state) {
  return {
    userIsAuthenticated: state.user.userIsAuthenticated,
    serviceRequests: state.serviceRequests.serviceRequests,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AllActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderResponseApp)
