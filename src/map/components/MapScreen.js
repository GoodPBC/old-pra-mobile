import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Navigator } from 'react-native-deprecated-custom-components';
import moment from 'moment';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';

import {
  BODY_BACKGROUND,
} from '../../shared';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServiceRequest: null,
    };
    this.markers = {};
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.renderActiveServiceRequestMarkers = this.renderActiveServiceRequestMarkers.bind(this);
    this.setMapBoundaries = this.setMapBoundaries.bind(this);
    this.getMapBoundaries = this.getMapBoundaries.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
    this.onCalloutPress = this.onCalloutPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setMapBoundaries();
    if (!nextProps.context) {
      this.setState({ selectedServiceRequest: nextProps.context });
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.context !== nextProps.context) {
      if (this.props.context && this.markers[this.props.context]) {
        this.markers[this.props.context].hideCallout();
      }
      if (nextProps.context && this.markers[nextProps.context]) {
        this.markers[nextProps.context].showCallout();
      }
    }
  }

  onCalloutPress(serviceRequest) {
    return () => {
      this.props.gaTrackPressEvent('Callout');
      const url = this.getEncodedURIForDirection(serviceRequest);
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Alert.alert(
            'You are about to leave the app',
            'Open Google Maps to get directions to this location?',
            [
              { text: 'Cancel' },
              { text: 'Continue', onPress: () => Linking.openURL(url) },
            ]
          );
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    };
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  getMapBoundaries() {
    const { activeServiceRequests, userPosition } = this.props;

    const defaultRegion = {
      latitude: userPosition.latitude || 40.705342,
      longitude: userPosition.longitude || -74.012035,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const lats = activeServiceRequests.map(sr => sr.latitude).concat(userPosition.latitude).filter(x => x);
    const lngs = activeServiceRequests.map(sr => sr.longitude).concat(userPosition.longitude).filter(x => x);

    if (!activeServiceRequests.length || !lats.length || !lngs.length) {
      return defaultRegion;
    }

    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    return {
      latitude: (maxLat + minLat) / 2,
      longitude: (maxLng + minLng) / 2,
      latitudeDelta: ((maxLat - minLat) + 0.001) * 1.5,
      longitudeDelta: ((maxLng - minLng) + 0.001) * 1.5,
    };
  }

  setMapBoundaries() {
    const newRegion = this.getMapBoundaries();
    this.MAP_VIEW.animateToRegion(newRegion);
  }

  getEncodedURIForDirection(serviceRequest) {
    const { address, cross_streets, borough, city, state, zip } = serviceRequest;
    let destination;
    if (!address || !address.length) {
      destination = [cross_streets, borough, city, state, zip].join('+');
    } else {
      destination = [address, borough, city, state, zip].join('+');
    }
    return encodeURI(`https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${destination}`);
  }

  selectMarker(serviceRequestNumber) {
    return () => {
      this.props.gaTrackPressEvent('Pin');
      this.setState({ selectedServiceRequest: serviceRequestNumber });
    };
  }

  renderActiveServiceRequestMarkers() {
    const { activeServiceRequests } = this.props;
    console.log("activeServiceRequests", activeServiceRequests);

    const twentyMinutesAgo = moment().subtract(20, 'minutes');
    const fortyMinutesAgo = moment().subtract(40, 'minutes');

    return (
      activeServiceRequests.map(serviceRequest => {
        const {
          latitude,
          longitude,
          sr_number,
          provider_assigned_time,
          formattedAddress,
        } = serviceRequest;

        if (!latitude || !longitude) {
          return null;
        }

        // 0-20 mintues old = green
        // 21-40 mintues old = yellow
        // >40 minutes old = red

        const assignedTime = moment(provider_assigned_time, 'YYYY-MM-DD HH:mm:ss.SSS');

        let pinColor = 'red';
        if (this.state.selectedServiceRequest === sr_number) {
          pinColor = 'blue';
        } else if (assignedTime.isSameOrAfter(twentyMinutesAgo)) {
          pinColor = 'green';
        } else if (assignedTime.isSameOrAfter(fortyMinutesAgo)) {
          pinColor = 'yellow';
        } else {
          pinColor = 'red';
        }

        return (
          <MapView.Marker
            ref={ref => { this.markers[sr_number] = ref; }}
            identifier={sr_number}
            coordinate={{ latitude, longitude }}
            key={sr_number}
            pinColor={pinColor}
            description={formattedAddress}
            onPress={this.selectMarker(sr_number)}
          >
            <MapView.Callout
              style={styles.callout}
              onPress={this.onCalloutPress(serviceRequest)}
            >
              <Text>{formattedAddress}</Text>
            </MapView.Callout>
          </MapView.Marker>

        );
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.MAP_VIEW = ref; }}
          onMapReady={this.setMapBoundaries}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          loadingEnabled={true}
        >
          {this.renderActiveServiceRequestMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BODY_BACKGROUND,
    flex: 1,
    marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  },
  modal: {
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  callout: {
    position: 'relative',
    maxWidth: 250,
  },
});

MapScreen.propTypes = {
  activeServiceRequests: PropTypes.array,
  gaTrackPressEvent: PropTypes.func.isRequired,
  userPosition: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  context: PropTypes.string,
};
