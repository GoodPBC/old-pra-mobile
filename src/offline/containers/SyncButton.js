/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SyncButton from '../components/SyncButton';
import * as SyncActions from '../actions';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SyncActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncButton);
