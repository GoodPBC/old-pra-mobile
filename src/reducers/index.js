import { combineReducers } from 'redux';
import serviceRequests from './serviceRequests';
import teams from './teams';
import user from './user';

export default combineReducers({
  serviceRequests,
  teams,
  user,
});