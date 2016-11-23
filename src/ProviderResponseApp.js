import React from 'react';
import { Provider } from 'react-redux';
import App from './app/containers/App';
import configureStore from './store';

const store = configureStore();

export default function ProviderResponseApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}