import React from 'react';
import { View, Platform, Dimensions, AppState } from 'react-native';
import { Provider } from 'react-redux';
import crashlytics from 'react-native-fabric-crashlytics';
import Config from 'react-native-config';
import codePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';

import App from './app/containers/App';
import configureStore from './store';

crashlytics.init();

const store = configureStore();

const { width, height } = Dimensions.get('window');

class ProviderResponseApp extends React.Component {
  constructor() {
    super();
    this.state = {
      appState: AppState.currentState,
      codepushed: false,
      downloadProgress: 0,
    };
    this.resetState = this.resetState.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(nextAppState) {
    const { appState } = this.state;
    console.log(`[AppStateChange] ${appState} -> ${nextAppState}`);
    if (appState === 'background' && nextAppState === 'active') {
      this.resetState();
    }
    this.setState({ appState: nextAppState });
  }

  codePushStatusDidChange(status) {
    console.log("CODE_PUSH_STATUS:", status)
    switch(status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ downloadProgress: 0 });
      case codePush.SyncStatus.UP_TO_DATE:
      case codePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ codepushed: true });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    const { receivedBytes, totalBytes } = progress;
    this.setState({ downloadProgress: receivedBytes / totalBytes });
  }

  resetState() {
    this.setState({
      codepushed: false,
      downloadProgress: 0,
    });
  }

  render() {
    const { downloadProgress } = this.state;

    const circleSize = Math.min(width, height) * 0.5;

    if (!this.state.codepushed) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Progress.Circle
            indeterminate={!downloadProgress}
            color="#FFFFFF"
            progress={downloadProgress}
            showsText={true}
            size={circleSize}
          />
        </View>
      )
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: Config[`CODE_PUSH_DEPLOYMENT_KEY_${Platform.OS.toUpperCase()}`],
  // deploymentKey: 'GOlSSSarRVraEHOvT4MUpo0D--gV83ae2fdc-0413-443b-bc9d-06988ea0c1cf', // staging_ios_key
};

export default codePush(codePushOptions)(ProviderResponseApp)
