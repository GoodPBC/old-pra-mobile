import { combineReducers } from 'redux';
import serviceRequests from './serviceRequests';
import user from './user';

export default combineReducers({
  serviceRequests,
  user
});