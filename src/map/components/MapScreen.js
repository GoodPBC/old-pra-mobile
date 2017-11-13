import React, { Component, PropTypes } from 'react';
import { Navigator } from 'react-native';
import moment from 'moment';

import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions
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
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.setStateWithActiveServiceRequests = this.setStateWithActiveServiceRequests.bind(this);
    this.renderActiveServiceRequestMarkers = this.renderActiveServiceRequestMarkers.bind(this);
    this.getMapBoundaries = this.getMapBoundaries.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  setStateWithActiveServiceRequests(activeServiceRequests) {
    const region = this.getMapBoundaries(activeServiceRequests);
    this.setState({ activeServiceRequests, region });
  }

  getMapBoundaries(activeServiceRequests) {
    const { lastPosition } = this.state;

    if (!activeServiceRequests) {
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
      latitudeDelta: (maxLat - minLat + 0.001) * 1.25,
      longitudeDelta: (maxLng - minLng + 0.001) * 1.25,
    }
  }

  componentWillMount() {
    for (var i = 0; i < this.props.activeServiceRequests.length; i++) {
      getLatLong(
        this.props.activeServiceRequests[i],
        i,
        this.props.activeServiceRequests.length,
        this.setStateWithActiveServiceRequests
      )
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
        this.setState({
          lastPosition: { latitude, longitude },
          region,
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // var lastPosition = JSON.stringify(position);
      //this.setState({lastPosition});
    });

    let activeServiceRequests = [];


    async function getLatLong(marker, index, arrLength, successCallback){
      let address;
      // use cross streets if address is blank
      if (marker.address === '') {
        address = `${marker.cross_streets}, ${marker.borough}, ${marker.city}`;
      } else {
        address = `${marker.address}, ${marker.borough}, ${marker.city}`;
      }

      let key = 'AIzaSyDDXSqDsclRyA0WAQu1wpGdldnGnBh3oWw'
      let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`

      //console.log(url)
      let body = ''

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

          let latitude = json.results[0].geometry.location.lat;
          let longitude = json.results[0].geometry.location.lng;
          marker.latitude = latitude;
          marker.longitude = longitude;
          marker.formattedAddress = `${json.results[0].address_components[0].long_name} ${json.results[0].address_components[1].long_name}`

          activeServiceRequests.push(marker);

          if ( index == arrLength - 1 ){
            // run callback function to get access to this.setState()
            successCallback(activeServiceRequests);
          }
          //return marker

        } else {
          console.log('Request Failure');
          console.log(json.ErrorMessage);
        }
      } catch (e) {
        console.log(responseText);
        console.log('Unspecified failure');
      }
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  renderActiveServiceRequestMarkers() {
    const { activeServiceRequests } = this.state;

    return (
      activeServiceRequests &&
      activeServiceRequests.map((marker, key) => {

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

        return(
          <MapView.Marker
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            key={key}
            pinColor={pinColor}
          >
            <MapView.Callout
              style={{ flex: 1, position: 'relative' }}
            >
              <View>
                <Text>{marker.formattedAddress}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        )
      })
    );
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
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
  }
});
