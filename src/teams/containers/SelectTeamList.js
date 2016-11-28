/**
 * SelectTeamList container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamList from '../components/SelectTeamList';
import * as TeamsActions from '../actions';

function mapStateToProps(state) {
  return {
    selectedTeam: state.teams.selectedTeam,
    teams: state.teams.teams,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamList);
