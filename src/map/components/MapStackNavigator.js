import MapScreen from '../containers/MapScreen';
import { createStackNavigator } from '../../shared';

const MapStackNavigator = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        title: 'Nearby Requests',
      },
    },
  },
  {
    initialRouteName: 'Map',
  },
);

export default MapStackNavigator;
