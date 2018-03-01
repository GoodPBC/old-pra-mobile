import LogoutScreen from '../containers/LogoutScreen';
import { createStackNavigator } from '../../shared';

const UserStackNavigator = createStackNavigator(
  {
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        title: 'User',
      },
    },
  },
);

export default UserStackNavigator;
