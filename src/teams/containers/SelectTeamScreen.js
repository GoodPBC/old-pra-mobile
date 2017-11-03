/**
 * SelectTeamList container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamScreen from '../components/SelectTeamScreen';
import * as TeamsActions from '../actions';
import { getCurrentTeam, getSelectedTeam } from '../selectors';

function mapStateToProps(state) {
  return {
    currentTeam: getCurrentTeam(state),
    selectedTeam: getSelectedTeam(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamScreen);
