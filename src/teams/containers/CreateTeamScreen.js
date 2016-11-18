/**
 * CreateTeamScreen container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateTeamScreen from '../components/CreateTeamScreen';
import * as TeamsActions from '../actions';

function mapStateToProps(state) {
  return {
    currentTeam: state.teams.currentTeam,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamScreen);
