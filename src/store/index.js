import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import providerAPI from '../middleware/providerAPI';
import {persistStore, autoRehydrate} from 'redux-persist';
import { AsyncStorage } from 'react-native';

import app from '../app/reducers';
import serviceRequests from '../serviceRequests/reducers';
import teams from '../teams/reducers';
import user from '../user/reducers';

const reducer = combineReducers({
  app,
  serviceRequests,
  teams,
  user,
});

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk, providerAPI),
    autoRehydrate()
  );
  persistStore(store, { storage: AsyncStorage });
  return store
}