import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchServiceRequestDetails,
  selectServiceRequest,
  ServiceRequestList,
} from '../../serviceRequests';
import * as SyncActions from '../actions';
import { getSyncableServiceRequests } from '../../serviceRequests/selectors';

function mapStateToProps(state) {
  return {
    activeServiceRequests: getSyncableServiceRequests(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...SyncActions,
    fetchServiceRequestDetails,
    selectServiceRequest,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestList);
