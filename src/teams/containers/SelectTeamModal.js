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
    // teams: getTeams(state),
    userAccountName: state.user.userAccountName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser, ...TeamsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamModal);
