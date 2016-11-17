/**
 * ProviderResponseApp
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './app/containers/App';
import configureStore from './store';

const store = configureStore()

export default class ProviderResponseApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}