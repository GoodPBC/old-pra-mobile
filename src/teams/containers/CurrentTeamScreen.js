/**
 * CreateTeamScreen container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurrentTeamScreen from '../components/CurrentTeamScreen';
import * as TeamsActions from '../actions';
import { getCurrentTeam } from '../selectors';

/**
 * Should be able to see the user's currently-assigned team.
 */
function mapStateToProps(state) {
  return {
    userName: state.user.name,
    currentTeam: getCurrentTeam(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTeamScreen);
