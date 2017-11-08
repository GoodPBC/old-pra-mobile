import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import providerAPI from '../middleware/providerAPI';
import offlineSync from '../middleware/offlineSync';
import googleAnalytics from '../middleware/googleAnalytics';

import app from '../app/reducers';
import offline from '../offline/reducers';
import serviceRequests from '../serviceRequests/reducers';
import teams from '../teams/reducers';
import user from '../user/reducers';

const reducer = combineReducers({
  app,
  offline,
  serviceRequests,
  teams,
  user,
});

// include 'logger' for debugging
const middleware = applyMiddleware(
  thunk,
  googleAnalytics,
  offlineSync,
  providerAPI
);

const logger = createLogger();

export default function configureStore() {
  const store = createStore(
    reducer,
    middleware,
    autoRehydrate()
  );
  persistStore(store, { storage: AsyncStorage }); // .purge() to reset
  return store;
}
