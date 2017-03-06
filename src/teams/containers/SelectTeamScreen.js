/**
 * SelectTeamList container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectTeamScreen from '../components/SelectTeamScreen';
import * as TeamsActions from '../actions';
import { getSelectedTeam } from '../selectors';

function mapStateToProps(state) {
  return {
    selectedTeam: getSelectedTeam(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeamScreen);
