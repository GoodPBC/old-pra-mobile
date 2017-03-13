import React from 'react';
import { Provider } from 'react-redux';
import crashlytics from 'react-native-fabric-crashlytics';
import App from './app/containers/App';
import configureStore from './store';

crashlytics.init();

const store = configureStore();

export default function ProviderResponseApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}