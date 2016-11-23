/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceRequestNavigation from '../components/ServiceRequestNavigation';
import * as ServiceRequestActions from '../actions';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestNavigation);
