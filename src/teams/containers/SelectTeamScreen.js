/**
 * SelectTeamList container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamScreen from '../components/SelectTeamScreen';
import * as TeamsActions from '../actions';

function mapStateToProps(state) {
  return {
    selectedTeam: state.teams.selectedTeam,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamScreen);
