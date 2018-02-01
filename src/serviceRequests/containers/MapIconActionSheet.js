/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapIconActionSheet from '../components/MapIconActionSheet';
import { gaTrackEvent } from '../../app/actions';

/**
 * Map only necessary data for the 'Contacts' list.
 */

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    gaTrackEvent,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapIconActionSheet);
