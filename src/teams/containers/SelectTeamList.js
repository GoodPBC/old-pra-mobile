/**
 * SelectTeamList container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamList from '../components/SelectTeamList';
import * as TeamsActions from '../actions';
import { getCurrentTeam, getSelectedTeam, getTeams } from '../selectors';

function mapStateToProps(state) {
  return {
    currentTeam: getCurrentTeam(state),
    selectedTeam: getSelectedTeam(state),
    teams: getTeams(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamList);
