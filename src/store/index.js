import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import providerAPI from '../middleware/providerAPI';
import {persistStore, autoRehydrate} from 'redux-persist';
import { AsyncStorage } from 'react-native';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk, providerAPI),
    autoRehydrate()
  );
  persistStore(store, { storage: AsyncStorage });
  return store
}