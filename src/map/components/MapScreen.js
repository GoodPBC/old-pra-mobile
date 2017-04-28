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
      },
      {
        address:"145 EAST 9 STREET, N/A",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1391975431",
        provider_assigned_time:"Apr 14 2017 12:20PM",
        latitude: 40.7302352,
        longitude: -73.9897468
      },
      {
        address:"79 AVENUE A, N/A",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1391975631",
        provider_assigned_time:"Apr 14 2017 12:20PM",
        latitude: 40.7250967,
        longitude: -73.9844859
      },
      {
        address:"65 WEST 14 STREET, N/A",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1391968881",
        provider_assigned_time:"Apr 14 2017 12:20PM",
        latitude: 40.737357,
        longitude: -73.9963655
      },
      {
        address:"458 5 AVENUE, N/A",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1391951351",
        provider_assigned_time:"Apr 14 2017 12:21PM",
        latitude: 40.6687525,
        longitude: -73.98685979999999 
      },
      {
        address:"",
        borough:"QUEENS",
        city:"JAMAICA",
        sr_number:"1-1-1392071821",
        provider_assigned_time:"",
        latitude: 40.702677,
        longitude: -73.7889689
      },
      {
        address:"100 WEST 92 STREET, N/A",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1392065881",
        provider_assigned_time:"Apr 14 2017 12:21PM",
        latitude: 40.7903625,
        longitude: -73.9703497
      },
      {
        address:"130 WEST 34 STREET, N/A",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1392085191",
        provider_assigned_time:"Apr 14 2017 12:21PM",
        latitude: 40.75015,
        longitude: -73.98939480000001
      },
      {
        address:"",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1392090331",
        provider_assigned_time:"Apr 14 2017 12:22PM",
        latitude: 40.7830603,
        longitude: -73.9712488
      },
      {
        address:"40.7528859",
        borough:"MANHATTAN",
        city:"NEW YORK",
        sr_number:"1-1-1391950381",
        provider_assigned_time:"Apr 14 2017 12:22PM",
        latitude: 40.7528859,
        longitude: -74.005797 
      }]
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentDidMount() {

    /*
    for (var i = 0; i < this.props.activeServiceRequests.length; i++) {
      getLatLong(this.props.activeServiceRequests[i], i, this.props.activeServiceRequests.length)
    }
    */

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


    async function getLatLong(marker, index, arrLength){
      let address = `${marker.address}, ${marker.borough}, ${marker.city}`;
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

          activeServiceRequests.push(marker);
          
          if ( index == arrLength - 1 ){
            console.log('all done');
            /*
            this.setState({
              activeServiceRequests: activeServiceRequests
            })
            */
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
          {this.state.sampleActiveServiceRequests ? this.state.sampleActiveServiceRequests.map((marker, key) => {
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
                  <Text>{marker.address}</Text>
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