/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContactSection from '../components/ContactSection';
import * as ServiceRequestActions from '../actions';

/**
 * Map only necessary data for the 'Contacts' list.
 */

function mapStateToProps(state) {
  return {
    contacts: state.serviceRequests.currentServiceRequest.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactSection);