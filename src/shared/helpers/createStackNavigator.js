import { StackNavigator } from 'react-navigation';
import { DARK_BLUE } from '../../shared';

export default function createStackNavigator(routeConfig, stackConfig = {}) {
  const { navigationOptions, ...otherStackConfig } = stackConfig;

  return StackNavigator(
    routeConfig,
    {
      navigationOptions: ({ navigation }) => {
        let otherNavigationOptions = navigationOptions;
        if (typeof navigationOptions === 'function') {
          otherNavigationOptions = navigationOptions({ navigation });
        }

        return {
          headerStyle: {
            backgroundColor: DARK_BLUE,
          },
          headerBackTitle: null,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          },
          ...otherNavigationOptions,
        };
      },
      ...otherStackConfig,
    },
  );
}
