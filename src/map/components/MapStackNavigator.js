import MapScreen from '../containers/MapScreen';
import { createStackNavigator } from '../../shared';

const MapStackNavigator = createStackNavigator(
  {
    NearbyRequests: {
      screen: MapScreen,
      navigationOptions: {
        title: 'Nearby Requests',
      },
    },
  },
  {
    initialRouteName: 'NearbyRequests',
  },
);

export default MapStackNavigator;
