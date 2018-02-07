import { createStackNavigator } from '../../shared';
import CurrentTeamScreen from '../containers/CurrentTeamScreen';
import SelectTeamScreen from '../containers/SelectTeamScreen';

const TeamStackNavigator = createStackNavigator(
  {
    CurrentTeam: {
      screen: CurrentTeamScreen,
      navigationOptions: {
        title: 'Teams',
      },
    },
    ChangeTeam: {
      screen: SelectTeamScreen,
      navigationOptions: {
        title: 'Change Team',
      },
    }
  },
  {
    initialRouteName: 'CurrentTeam',
  },
);

export default TeamStackNavigator;
