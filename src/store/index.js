import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import providerAPI from '../middleware/providerAPI';
import offlineSync from '../middleware/offlineSync';
import googleAnalytics from '../middleware/googleAnalytics';

import app from '../app/reducer';
import offline from '../offline/reducer';
import serviceRequests from '../serviceRequests/reducer';
import teams from '../teams/reducer';
import user from '../user/reducer';


const reducer = combineReducers({
  app,
  offline,
  serviceRequests,
  teams,
  user,
});

const middlewares = [
  thunk,
  googleAnalytics,
  offlineSync,
  providerAPI,
];

if (__DEV__) {
  const logger = createLogger();
  middlewares.push(logger);
}

export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares),
    autoRehydrate()
  );
  persistStore(store, { storage: AsyncStorage }); // .purge() to reset
  return store;
}
