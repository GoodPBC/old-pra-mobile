/**
 * TeamUserList container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TeamUserList from '../components/TeamUserList';
import * as TeamsActions from '../actions';

/**
 * Needs the list of teams to display.
 */
function mapStateToProps(state) {
  return {
    users: state.teams.teamUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamUserList);
