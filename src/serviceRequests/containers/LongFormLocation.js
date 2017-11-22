/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LongFormLocation from '../components/LongFormLocation';
import { selectTab } from '../../app/actions';
import * as ServiceRequestActions from '../actions';

/**
 * Map only necessary data for the 'Contacts' list.
 */

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab,
    ...ServiceRequestActions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LongFormLocation);
