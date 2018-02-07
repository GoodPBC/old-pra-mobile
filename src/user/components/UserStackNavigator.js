import LogoutScreen from '../containers/LogoutScreen';
import { DARK_BLUE, createStackNavigator } from '../../shared';

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
