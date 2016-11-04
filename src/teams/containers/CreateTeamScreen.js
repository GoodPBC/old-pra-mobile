/**
 * CreateTeamScreen container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateTeamScreen from '../components/CreateTeamScreen';
import * as TeamsActions from '../actions';

/**
 * No application state necessary for this form.
 */
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamScreen);
