/**
 * StreetSmart
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/containers/App';
import configureStore from './src/store';

const store = configureStore()

class StreetSmart extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('StreetSmart', () => StreetSmart);
