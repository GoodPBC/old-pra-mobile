import { StackNavigator } from 'react-navigation';

import LogoutScreen from '../containers/LogoutScreen';
import { DARK_BLUE } from '../../shared';

const UserStackNavigator = StackNavigator(
  {
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        title: 'User',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: DARK_BLUE,
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      }
    })
  },
);

export default UserStackNavigator;
