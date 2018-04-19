import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';

import { getAddress } from '../helpers';
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
    this.renderGeneralCanvassingData = this.renderGeneralCanvassingData.bind(this);
    this.renderIntensiveCanvassingData = this.renderIntensiveCanvassingData.bind(this);
    this.renderJointOperationsData = this.renderJointOperationsData.bind(this);
    this.renderPanhandlingData = this.renderPanhandlingData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setMapBoundaries();
    if (!nextProps.context && nextProps.context !== this.props.context) {
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

    const lats = activeServiceRequests.map(sr => sr.latitude).concat(userPosition.latitude).filter(x => x);
    const lngs = activeServiceRequests.map(sr => sr.longitude).concat(userPosition.longitude).filter(x => x);

    if (lats.length <= 1) {
      return {
        latitude: lats[0] || 40.705342,
        longitude: lngs[0] || -74.012035,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
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

    return (
      activeServiceRequests.map(serviceRequest => {
        const {
          latitude,
          longitude,
          sr_number,
          provider_assigned_time,
        } = serviceRequest;
        const formattedAddress = getAddress(serviceRequest);

        if (!latitude || !longitude) {
          return null;
        }

        // 0-20 mintues old = green
        // 21-40 mintues old = yellow
        // >40 minutes old = red

        const assignedTime = moment(provider_assigned_time, 'YYYY-MM-DD HH:mm:ss.SSS');
        const minutesOld = moment().diff(assignedTime, 'minutes', true);

        let pinColor = 'red';
        if (this.state.selectedServiceRequest === sr_number) {
          pinColor = 'blue';
        } else if (minutesOld < 20) {
          pinColor = 'green';
        } else if (minutesOld < 40) {
          pinColor = 'yellow';
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

  renderCanvassingDataMarkers(data, keyPrefix) {
    return data.map((survey, i) => {
      const { Latitude: latitude, Longitude: longitude } = survey;
      const submittedDate = moment(survey.SubmittedDate, 'YYYY-MM-DD HH:mm:ss.SSS');
      const submittedDateString = submittedDate.format('MMM D, H:m A');
      const minutesOld = moment().diff(submittedDate, 'minutes', true);
      const coordinate = { latitude, longitude };
      let markerColor = '#FF4040'; // red
      if (minutesOld < 20) {
        markerColor = '#40FF40'; // green
      } else if (minutesOld < 40) {
        markerColor = '#FFFF40'; // yellow
      }

      return (
        <MapView.Marker
          key={`${keyPrefix}-${i}`}
          description={submittedDateString}
          coordinate={coordinate}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 18,
              backgroundColor: markerColor,
              borderWidth: 2,
              borderColor: 'white',
            }}
          />
        </MapView.Marker>
      );
    });
  }

  renderGeneralCanvassingData() {
    return this.renderCanvassingDataMarkers(
      this.props.generalCanvassingData,
      'general-canvassing'
    );
  }

  renderIntensiveCanvassingData() {
    return this.renderCanvassingDataMarkers(
      this.props.intensiveCanvassingData,
      'intensive-canvassing'
    );
  }

  renderJointOperationsData() {
    return this.renderCanvassingDataMarkers(
      this.props.jointOperationsData,
      'joint-operations'
    );
  }

  renderPanhandlingData() {
    return this.renderCanvassingDataMarkers(
      this.props.panhandlingData,
      'panhandling'
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
          showsUserLocation
          showsMyLocationButton
          showsCompass
          showsScale
          loadingEnabled
        >
          {this.renderActiveServiceRequestMarkers()}
          {this.renderGeneralCanvassingData()}
          {this.renderIntensiveCanvassingData()}
          {this.renderJointOperationsData()}
          {this.renderPanhandlingData()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BODY_BACKGROUND,
    flex: 1,
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
