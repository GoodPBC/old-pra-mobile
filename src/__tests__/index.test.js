import 'react-native';
import React from 'react';
import ProviderResponseApp from '../ProviderResponseApp';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  // const app = renderer.create(<ProviderResponseApp />).toJSON();
  // expect(app).toBeTruthy();
  const tree = renderer.create(
    <ProviderResponseApp />
  );
});
