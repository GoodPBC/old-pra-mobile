import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Navigator } from 'react-native';
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
import AnimatedMarker from './AnimatedMarker';
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
      activeServiceRequests: {},
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
      selectedMarker: null,
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.setStateWithActiveServiceRequests = this.setStateWithActiveServiceRequests.bind(this);
    this.renderActiveServiceRequestMarkers = this.renderActiveServiceRequestMarkers.bind(this);
    this.getMapBoundaries = this.getMapBoundaries.bind(this);
    this.updateLastPosition = this.updateLastPosition.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
    this.getLatLong = this.getLatLong.bind(this);
    this.getServiceRequestPositions = this.getServiceRequestPositions.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.onCalloutPress = this.onCalloutPress.bind(this);
  }

  //google map :
  //originally marker's are just circles.
  //if selected it changes to pin with animation.
  //if unselected it becomes a circle again.
  componentWillUpdate(nextProps, nextState) {
    if (this.props.context !== nextProps.context) {
      if (this.props.context) {
        const markerToHide = this.markers[this.props.context];
        markerToHide && markerToHide.hideCallout();
      }
      if (nextProps.context) {
        this.setState({ selectedMarker: nextProps.context });
        const markerToShow = this.markers[nextProps.context];
        markerToShow && markerToShow.showCallout();
      }
    }
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  setStateWithActiveServiceRequests(newServiceRequest) {
    const region = this.getMapBoundaries([
      ...Object.values(this.state.activeServiceRequests),
      newServiceRequest,
    ]);
    const activeServiceRequests = {
      ...this.state.activeServiceRequests,
      [newServiceRequest.sr_number]: newServiceRequest,
    }
    this.setState({ region, activeServiceRequests });
  }

  getMapBoundaries(activeServiceRequests) {
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

    return {
      latitude: (maxLat + minLat) / 2,
      longitude: (maxLng + minLng) / 2,
      latitudeDelta: (maxLat - minLat + 0.001) * 1.5,
      longitudeDelta: (maxLng - minLng + 0.001) * 1.5,
    }
  }

  updateLastPosition(position) {
    const { latitude, longitude } = position.coords;
    this.setState({
      lastPosition: {
        latitude,
        longitude,
      },
    })
  }

  handleLocationServiceError(error) {
    Alert.alert(JSON.stringify(error));
  }

  componentWillReceiveProps(nextProps) {
    const currentActiveServiceRequests = this.state.activeServiceRequests;
    const nextActiveServiceRequests = nextProps.activeServiceRequests;

    const currentServiceRequestNumbers = Object.keys(currentActiveServiceRequests);
    const nextServiceRequestNumbers = nextActiveServiceRequests.map(sr => sr.sr_number);

    // Delete requests that are not active anymore
    const filteredServiceRequests = currentServiceRequestNumbers.reduce((acc, sr_number) => {
      if (nextServiceRequestNumbers.includes(sr_number)) {
        return {
          ...acc,
          [sr_number]: currentActiveServiceRequests[sr_number],
        };
      } else {
        return acc;
      }
    }, {});

    const nextActiveServiceRequestsWithoutCoords = nextActiveServiceRequests.filter(sr => {
      return !currentServiceRequestNumbers.includes(sr.sr_number);
    })

    this.setState({ activeServiceRequests: filteredServiceRequests });
    this.getServiceRequestPositions(nextActiveServiceRequestsWithoutCoords);
  }

  watchPosition() {
    navigator.geolocation.getCurrentPosition(
      this.updateLastPosition,
      this.handleLocationServiceError,
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateLastPosition);
  }

  getServiceRequestPositions(serviceRequests) {
    for (let i = 0; i < serviceRequests.length; i++) {
      this.getLatLong(
        serviceRequests[i],
        this.setStateWithActiveServiceRequests
      )
    }
  }

  async getLatLong(marker, successCallback) {
    let address;
    // use cross streets if address is blank
    if (marker.address && marker.address.length) {
      address = `${marker.address}, ${marker.borough}, ${marker.city}`;
    } else {
      address = `${marker.cross_streets}, ${marker.borough}, ${marker.city}`;
    }

    let key = Config.GOOGLE_GEOLOCATION_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`

    try {
      response = await fetch(url, {
        method: 'get'
      });
    } catch (e) {
      console.log('Network Failure');
      return;
    }

    let responseText = null;

    try {
      responseText = await response.text();
      const json = JSON.parse(responseText);

      if (response.ok && !(json.ErrorMessage && json.ErrorMessage.length)) {
        const coords = json.results[0].geometry.location;
        const addresses = json.results[0].address_components;
        marker.latitude = coords.lat;
        marker.longitude = coords.lng;
        marker.formattedAddress = `${addresses[0].long_name} ${addresses[1].long_name}`
        successCallback(marker);
      } else {
        console.log('Request Failure');
        console.log(json.ErrorMessage);
      }
    } catch (e) {
      console.log(responseText);
      console.log('Unspecified failure');
    }
  }

  componentWillMount() {
    this.watchPosition();
    this.getServiceRequestPositions(this.props.activeServiceRequests);
  }

  selectMarker(serviceRequestNumber) {
    return e => {
      this.setState({ selectedMarker: serviceRequestNumber });
    }
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

  onCalloutPress(serviceRequest) {
    return () => {
      const url = this.getEncodedURIForDirection(serviceRequest);
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Alert.alert(
            'You are about to leave the app',
            'Open Google Maps to get directions to this location?',
            [
              {text: 'Cancel'},
              {text: 'Continue', onPress: () => Linking.openURL(url)},
            ]
          )
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      })
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  renderActiveServiceRequestMarkers() {
    const { activeServiceRequests } = this.state;
    return (
      Object.keys(activeServiceRequests).map(sr_number => {
        const marker = activeServiceRequests[sr_number];
        // 0-20 mintues old = green
        // 21-40 mintues old = yellow
        // >40 minutes old = red

        let pinColor = 'green'
        let age = moment(marker.provider_assigned_time, 'YYYY-MM-DD HH:mm:ss.SSS');
        age = age.unix() / 60;
        let now = moment(Date.now()).unix() / 60;
        let diff = Math.floor(now - age);
        if (diff > 20 && diff <= 40){
          pinColor = 'yellow';
        } else if (diff > 40) {
          pinColor = 'red';
        }

        if (this.props.context === marker.sr_number) {
          pinColor = 'blue';
        }

        return (
          <MapView.Marker
            ref={m => this.markers = { ...(this.markers || {}), [marker.sr_number]: m }}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            key={sr_number}
            pinColor={pinColor}
            description={marker.formattedAddress}
            onPress={this.selectMarker(marker.sr_number)}
          >
            <AnimatedMarker color={pinColor} />
            <MapView.Callout
              style={styles.callout}
              onPress={this.onCalloutPress(marker)}
            >
              <Text>{marker.formattedAddress}</Text>
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