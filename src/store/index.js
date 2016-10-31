import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import providerAPI from '../middleware/providerAPI';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk, providerAPI)
  )
  return store
}