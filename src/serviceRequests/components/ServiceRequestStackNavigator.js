import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  InteractionManager,
  StyleSheet,
  View,
} from 'react-native';

import MyRequestsScreen from '../containers/MyRequestsScreen';
import ResolutionScreen from '../containers/ResolutionScreen';
import ServiceRequestDetailScreen from '../containers/ServiceRequestDetailScreen';
import ServiceRequestContactSelector from './ServiceRequestContactSelector';
import ServiceRequestAddContact from '../containers/ServiceRequestAddContact';
import { LIGHT_BLUE, DARK_BLUE, createStackNavigator } from '../../shared';

// export default class ServiceRequestNavigation extends Component {
//   constructor(props) {
//     super(props);
//     this._renderScene = this._renderScene.bind(this);
//     this._refreshServiceRequests = this._refreshServiceRequests.bind(this);
//   }
//
//   _refreshServiceRequests(route, navigator, index) {
//     if (index === 0 || index === 1) {
//       InteractionManager.runAfterInteractions(() => {
//         this.props.syncServiceRequests();
//       });
//     }
//   }
//
//   /**
//      * 2 screens: My Requests and the details screen
//     +2 screens: Contacts selection and add contacts
//    */
//   _renderScene(route, navigator) {
//     let content = null;
//     if (route.index === 0) {
//       content = <MyRequestsScreen navigator={navigator} />;
//     } else if (route.index === 1) {
//       content = <ServiceRequestDetailScreen navigator={navigator} />;
//     } else if (route.index === 2) {
//       content = <ServiceRequestContactSelector navigator={navigator} />;
//     } else if (route.index === 3) {
//       content = <ServiceRequestAddContact navigator={navigator} />;
//     } else if (route.index === 4) {
//       content = <ResolutionScreen navigator={navigator} />;
//     }
//     return (
//       <View style={styles.navAdjustment}>
//         {content}
//       </View>
//     );
//   }
//
//   render() {
//     const initialRoute = {
//       title: 'My Requests',
//       index: 0,
//     };
//     return (
//       <Navigation
//         initialRoute={initialRoute}
//         isRefreshing={this.props.isRefreshing}
//         networkIsConnected={this.props.networkIsConnected}
//         renderScene={this._renderScene}
//         onBack={this.props.fetchServiceRequests}
//         rightButtonAction={this._refreshServiceRequests}
//       />
//     );
//   }
// }

const ServiceRequestStackNavigator = createStackNavigator(
  {
    MyRequests: {
      screen: MyRequestsScreen,
      navigationOptions: {
        title: 'My Requests',
      },
    },
    ServiceRequestDetail: {
      screen: ServiceRequestDetailScreen,
      navigationOptions: {
        title: 'Request Details',
      },
    },
    Resolution: {
      screen: ResolutionScreen,
      navigationOptions: {
        title: 'Resolution',
      },
    },
  },
  {
    initialRouteName: 'MyRequests',
  },
);

export default ServiceRequestStackNavigator;
