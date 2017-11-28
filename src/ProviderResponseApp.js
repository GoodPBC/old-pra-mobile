import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  AppState,
  processColor,
  NativeModules,
} from 'react-native';
import { Provider } from 'react-redux';
import crashlytics from 'react-native-fabric-crashlytics';
import Config from 'react-native-config';
import codePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';
import Instabug from 'instabug-reactnative';

import App from './app/containers/App';
import { ImageContainer } from './shared';
import configureStore from './store';

// console.disableYellowBox = true;

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
      backgroundImageLoaded: false,
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.setBackgroundImageLoaded = this.setBackgroundImageLoaded.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  initializeInstabug() {
    if (!__DEV__) {
      // Instabug.setIntroMessageEnabled(false);
      // Instabug.setPrimaryColor(processColor('#DE6053'));
      // Instabug.setFloatingButtonEdge(Instabug.floatingButtonEdge.right, height - 120);
      Instabug.setPromptOptionsEnabled(false, true, true);
      Instabug.startWithToken(
        Config[`INSTABUG_TOKEN_${Platform.OS.toUpperCase()}`],
        Instabug.invocationEvent.shake
      )
      // setTimeout(() => {
      //   Instabug.startWithToken(
      //     Config[`INSTABUG_TOKEN_${Platform.OS.toUpperCase()}`],
      //     Instabug.invocationEvent.floatingButton
      //   )
      // }, 3000)
    }
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      this.setState({ codepushed: false });
    }
    this.setState({ appState: nextAppState });
  }

  codePushStatusDidChange(status) {
    console.log("CODE_PUSH_STATUS:", status);
    switch(status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ codepushed: false });
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ downloadProgress: 0 });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
      case codePush.SyncStatus.UNKNOWN_ERROR:
        this.initializeInstabug();
        this.setState({ codepushed: true });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    const { receivedBytes, totalBytes } = progress;
    this.setState({ downloadProgress: receivedBytes / totalBytes });
  }

  setBackgroundImageLoaded(bool) {
    return () => this.setState({ backgroundImageLoaded: bool });
  }

  render() {
    const { appState, downloadProgress } = this.state;

    const circleSize = Math.min(width, height) * 0.5;

    if (appState !== 'active') {
      return null;
    }

    if (!this.state.codepushed) {
      return (
        <ImageContainer onLoadEnd={this.setBackgroundImageLoaded(true)}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
              this.state.backgroundImageLoaded && (
                <Progress.Circle
                  hidden
                  indeterminate={!downloadProgress}
                  color="#FFFFFF"
                  progress={downloadProgress}
                  showsText={true}
                  size={circleSize}
                />
              )
            }
          </View>
        </ImageContainer>
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
