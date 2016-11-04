/**
 * CreateTeamScreen container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurrentTeamScreen from '../components/CurrentTeamScreen';
import * as TeamsActions from '../actions/teams';

/**
 * Should be able to see the user's currently-assigned team.
 */
function mapStateToProps(state) {
  return {
    currentTeam: state.teams.currentTeam,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTeamScreen);
