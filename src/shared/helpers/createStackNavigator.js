import { StackNavigator } from 'react-navigation';
import { DARK_BLUE } from '../../shared';

export default function createStackNavigator(routeConfig, stackConfig = {}) {
  return StackNavigator(
    routeConfig,
    {
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: DARK_BLUE,
        },
        headerBackTitle: null,
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
        }
      }),
      ...stackConfig,
    },
  );
}
