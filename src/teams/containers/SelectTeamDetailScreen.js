/**
 * SelectTeamDetailScreen container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamDetailScreen from '../components/SelectTeamDetailScreen';
import * as TeamsActions from '../actions';

/**
 * No additional state necessary.
 */
function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamDetailScreen);
