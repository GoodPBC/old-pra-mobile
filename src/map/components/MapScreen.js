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

const INITIAL_LATITUDE = 40.705342;
const INITIAL_LONGITUDE = -74.012035;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;
const INITIAL_REGION = {
  latitude: INITIAL_LATITUDE,
  longitude: INITIAL_LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: INITIAL_REGION,
      selectedServiceRequest: null,
    };
    this.markers = {};
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.renderActiveServiceRequestMarkers = this.renderActiveServiceRequestMarkers.bind(this);
    this.setMapBoundaries = this.setMapBoundaries.bind(this);
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

  setMapBoundaries() {
    const markerCoordinates = Object.keys(this.markers).reduce((acc, srNumber) => (
      acc.concat(this.markers[srNumber].props.coordinate)
    ), []);

    this.MAP_VIEW.fitToCoordinates(
      [
        this.props.userPosition,
        ...markerCoordinates,
      ],
      {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 100,
          left: 100,
        },
        animated: true,
      }
    );
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
            coordinate={{ latitude: latitude || INITIAL_LATITUDE + 0.001, longitude: longitude || INITIAL_LONGITUDE + 0.001 }}
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
          ref={ref => { this.MAP_VIEW = ref; }}
          onLayout={this.setMapBoundaries}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          region={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
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
