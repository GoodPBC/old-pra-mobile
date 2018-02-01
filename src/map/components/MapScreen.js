import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import moment from 'moment';

import {
  Animated,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  Dimensions,
} from 'react-native';

import {
  InvertButton,
  InvertText,
  GradientBackground,
  Navigation,
  Separator,
  LIGHT_BLUE,
  BODY_BACKGROUND,
  CARD_BORDER,
  X_AXIS_PADDING,
} from '../../shared';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Config from 'react-native-config';

const INITIAL_LATITUDE = 40.705342;
const INITIAL_LONGITUDE = -74.012035;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPosition: {
        latitude: INITIAL_LATITUDE,
        longitude: INITIAL_LONGITUDE,
      },
      region: {
        latitude: INITIAL_LATITUDE,
        longitude: INITIAL_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      selectedServiceRequest: null,
    };
    this.markers = {};

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.renderActiveServiceRequestMarkers = this.renderActiveServiceRequestMarkers.bind(this);
    this.setMapBoundaries = this.setMapBoundaries.bind(this);
    this.updateLastPosition = this.updateLastPosition.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.onCalloutPress = this.onCalloutPress.bind(this);
  }

  componentWillMount() {
    this.watchPosition();
  }

  componentDidMount() {
    this.setMapBoundaries();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.context) {
      this.setState({ selectedServiceRequest: nextProps.context });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.context !== nextProps.context) {
      if (this.props.context && this.markers[this.props.context]) {
        this.markers[this.props.context].hideCallout();
      }
      if (nextProps.context && this.markers[nextProps.context]) {
        this.markers[nextProps.context].showCallout();
      }
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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

  setMapBoundaries() {
    const { activeServiceRequests } = this.props;
    const { lastPosition } = this.state;

    if (!activeServiceRequests || !activeServiceRequests.length) {
      return this.state.region;
    }

    const lats = activeServiceRequests.reduce((acc, serviceRequest) => {
      return serviceRequest.latitude ? [ ...acc, serviceRequest.latitude] : acc
    }, [lastPosition.latitude]);
    const lngs = activeServiceRequests.reduce((acc, serviceRequest) => {
      return serviceRequest.longitude ? [ ...acc, serviceRequest.longitude] : acc
    }, [lastPosition.longitude]);

    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const region = {
      latitude: (maxLat + minLat) / 2,
      longitude: (maxLng + minLng) / 2,
      latitudeDelta: (maxLat - minLat + 0.001) * 1.5,
      longitudeDelta: (maxLng - minLng + 0.001) * 1.5,
    };

    this.setState({ region });
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

  watchPosition() {
    navigator.geolocation.getCurrentPosition(
      this.updateLastPosition,
      this.handleLocationServiceError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateLastPosition);
  }

  handleLocationServiceError(error) {
    Alert.alert(JSON.stringify(error));
  }

  updateLastPosition(position) {
    const { latitude, longitude } = position.coords;
    this.setState({
      lastPosition: {
        latitude,
        longitude,
      },
    });
  }

  renderActiveServiceRequestMarkers() {
    const { activeServiceRequests } = this.props;

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
            ref={m => this.markers = { ...this.markers, [sr_number]: m }}
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
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          loadingEnabled={true}
          initialRegion={region}
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
