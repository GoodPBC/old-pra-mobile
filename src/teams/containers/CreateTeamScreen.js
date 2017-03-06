/**
 * CreateTeamScreen container
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateTeamScreen from '../components/CreateTeamScreen';
import * as TeamsActions from '../actions';
import { getCurrentTeam } from '../selectors';

function mapStateToProps(state) {
  return {
    currentTeam: getCurrentTeam(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TeamsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamScreen);
