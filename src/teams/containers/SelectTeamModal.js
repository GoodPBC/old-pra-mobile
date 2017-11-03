/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamModal from '../components/SelectTeamModal';
import * as TeamsActions from '../actions';
import { getTeams } from '../selectors';
import { logoutUser } from '../../user/actions';

function mapStateToProps(state) {
  return {
    canSelectTeams: state.teams.canSelectTeams,
    teams: getTeams(state),
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser, ...TeamsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamModal);
