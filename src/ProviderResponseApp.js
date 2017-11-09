import React from 'react';
import { View, Platform, Dimensions, AppState, NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import crashlytics from 'react-native-fabric-crashlytics';
import Config from 'react-native-config';
import codePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';
import Instabug from 'instabug-reactnative';

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
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentWillMount() {
    this.initializeInstabug();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  initializeInstabug() {
    Instabug.setPromptOptionsEnabled(false, true, true);
    Instabug.startWithToken(
      Config[`INSTABUG_TOKEN_${Platform.OS.toUpperCase()}`],
      Instabug.invocationEvent.shake
    )
  }

  handleAppStateChange(nextAppState) {
    this.setState({ appState: nextAppState });
  }

  codePushStatusDidChange(status) {
    console.log("CODE_PUSH_STATUS:", status);
    switch(status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ codepushed: false });
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

  render() {
    const { downloadProgress } = this.state;

    const circleSize = Math.min(width, height) * 0.5;

    if (!this.state.codepushed) {
      //TODO Use background Image during the loading.
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Progress.Circle
            indeterminate={!downloadProgress}
            color="#FF0000"
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
