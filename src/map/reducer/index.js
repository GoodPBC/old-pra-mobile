import { combineReducers } from 'redux';
import generalCanvassing from './generalCanvassingReducer';
import intensiveCanvassing from './intensiveCanvassingReducer';
import jointOperations from './jointOperationsReducer';
import panhandling from './panhandlingReducer';

export default combineReducers({
  generalCanvassing,
  intensiveCanvassing,
  jointOperations,
  panhandling,
});