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

jest.mock('react-native-code-push', () => ({
  CheckFrequency: {
    ON_APP_RESUME: 'ON_APP_RESUME',
  },
  InstallMode: {
    IMMEDIATE: 'IMMEDIATE',
  },
}))
