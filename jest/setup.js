jest.mock('react-native-fabric-crashlytics', () => ({
  init: jest.fn(),
}));

jest.mock('instabug-reactnative', () => ({
  setPromptOptionsEnabled: jest.fn(),
  startWithToken: jest.fn(),
  invocationEvent: {
    shake: 'shake',
  },
}));

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');

jest.mock('react-native-push-notification', () => ({
    configure: jest.fn(),
    onRegister: jest.fn(),
    onNotification: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
}));

jest.mock('react-native-code-push', () => {
  const codePush = () => app => app;
  codePush.InstallMode = {};
  codePush.CheckFrequency = {};
  return codePush;
});
