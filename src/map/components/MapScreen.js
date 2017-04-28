import React, { Component, PropTypes } from 'react';
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

import MapView from 'react-native-maps';


export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //initialPosition: 'unknown',
      //lastPosition: 'unknown',
      
      region: {
        latitude: 40.730610,
        longitude: -73.935242,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      
      region: {
        latitude: 40.730610,
        longitude: -73.935242,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },

      sampleActiveServiceRequests: [{
        address: "250 WEST 34 STREET, N A",
        borough: "MANHATTAN",
        city: "NEW YORK",
        provider_assigned_time:"Apr 14 2017 12:22PM",
        sr_number:"1-1-1391897861",
        latitude: 40.7513057,
        longitude: -73.99237339999999
      }]
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.setStateWithActiveServiceRequests = this.setStateWithActiveServiceRequests.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  setStateWithActiveServiceRequests(activeServiceRequests) {
    console.log('active service requests in callback function');
    console.log(activeServiceRequests)
    this.setState({
      activeServiceRequests: activeServiceRequests
    })
    console.log(this.state)
  }

  componentDidMount() {

    
    for (var i = 0; i < this.props.activeServiceRequests.length; i++) {
      getLatLong(this.props.activeServiceRequests[i], i, this.props.activeServiceRequests.length, this.setStateWithActiveServiceRequests)
    }
    

    navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
          this.setState({initialRegion: region})
          this.setState({region});
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = JSON.stringify(position);
        //this.setState({lastPosition});
    });

    let activeServiceRequests = [];


    async function getLatLong(marker, index, arrLength, successCallback){
      let address;
      if (marker.address === '') {
        address = `${marker.cross_streets}, ${marker.borough}, ${marker.city}`;
      } else {
        address = `${marker.address}, ${marker.borough}, ${marker.city}`;
      }

      let key = 'AIzaSyDSBuRHnbhlXOMvW1j6xG0rZIZBbesp0V0'
      let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`
      // looking for res.results[0].geometry.location.lat
      // res.results[0].geometry.location.lng
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
        // const textBody = await response.text();
        // console.log('body', textBody);
        responseText = await response.text();
        const json = JSON.parse(responseText);
        // console.log('json response', json);
        // console.log('response text', responseText);

        if (response.ok && !(json.ErrorMessage && json.ErrorMessage.length)) {
          //dispatchSuccess(json);
          let latitude = json.results[0].geometry.location.lat;
          let longitude = json.results[0].geometry.location.lng;
          marker.latitude = latitude;
          marker.longitude = longitude;
          marker.formattedAddress = `${json.results[0].address_components[0].long_name} ${json.results[0].address_components[1].long_name}`

          activeServiceRequests.push(marker);
          
          if ( index == arrLength - 1 ){
            console.log('all done');
            /*
            this.setState({
              activeServiceRequests: activeServiceRequests
            })
            */
            successCallback(activeServiceRequests);
          }
          //return marker
          
        } else {
          console.log('request failure');
          console.log(json.ErrorMessage);
          //dispatchFailure(json.ErrorMessage, response.status);
        }
      } catch (e) {
        console.log('response text', responseText);
        console.log("other failure");
      }
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    const initialRoute = {
      title: 'Nearby Requests',
      index: 0,
    };

    const initialRegion = {
      latitude: 40.730610,
      longitude: -73.935242,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }

    const sampleActiveServiceRequests = [{
      address: "250 WEST 34 STREET, N A",
      borough: "MANHATTAN",
      city: "NEW YORK",
      provider_assigned_time:"Apr 14 2017 12:22PM",
      sr_number:"1-1-1391897861",
      latitude: 40.7513057,
      longitude: -73.99237339999999
    },
    {
      address:"145 EAST 9 STREET, N/A",
      borough:"MANHATTAN",
      city:"NEW YORK",
      sr_number:"1-1-1391975431",
      provider_assigned_time:"Apr 14 2017 12:20PM",
      latitude: 40.7302352,
      longitude: -73.9897468
    }]


    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          initalRegion={{
            initialRegion
          }}
        >
          {/*<MapView.Marker coordinate={this.state.initialRegion} />*/}
          {this.state.activeServiceRequests ? this.state.activeServiceRequests.map((marker, key) => {
            let pinColor = 'red'

            // add time checking for pin colors back in once async add pins is working properly

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
            }) : null }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BODY_BACKGROUND,
    flex: 1
  },
  modal: {
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});