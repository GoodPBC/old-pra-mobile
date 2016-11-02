import React, { Component } from 'react';

import { StyleSheet, TabBarIOS, NavigatorIOS, Modal, TextInput, TouchableHighlight, Text, View } from 'react-native';

import ServiceRequestList from './ServiceRequestList';
import ServiceRequestDetail from './ServiceRequestDetail';

import Teams from './Teams';
import Feed from './Feed';
import Sync from './Sync';

export default class ProviderResponseApp extends Component {
  constructor(props) {
    super(props);

    // Fetch on initial app load.
    props.fetchServiceRequests();

    this.state = {
      loginModalVisible: true,
      username: null,
      password: null
    }
  }

  loginUser() {
    
  }

  setLoginModalVisible(visible) {
    this.setState({loginModalVisible: visible});
  }
  
  render() {
    const {
      serviceRequests,
    } = this.props;

    return (    
        <View style={styles.homeContainer}>
          <TabBarIOS barTintColor="black" tintColor="white" style={styles.tabBarNavigator} >
            <TabBarIOS.Item title="My Requests" selected={false} >
              <ServiceRequestList serviceRequests={serviceRequests} />
            </TabBarIOS.Item>
            <TabBarIOS.Item title='Feed' selected={false} >
              <NavigatorIOS 
                initialRoute = {{
                  component: Feed,
                  title: 'Feed'
                }}
              />
            </TabBarIOS.Item>
            <TabBarIOS.Item title='Teams' selected={true} >
              <NavigatorIOS 
                initialRoute = {{
                  component: Teams,
                  title: 'Teams'
                }}
              />
            </TabBarIOS.Item>
            <TabBarIOS.Item title='Sync' selected={false} >
              <NavigatorIOS 
                initialRoute = {{
                  component: Sync,
                  title: 'Sync'
                }}
              />
            </TabBarIOS.Item>
          </TabBarIOS>
          <View style={{marginTop: 22}}>
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.loginModalVisible}
              >
              <View style={{marginTop: 22}}>
                <View style={styles.loginModal}>
                  <Text>Username</Text>
                  <TextInput
                    style={styles.loginModalInput}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                  />
                  <Text>Password</Text>
                  <TextInput
                    style={styles.loginModalInput}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                  />
                  <TouchableHighlight
                    style={styles.button}
                    onPress={this.loginUser.bind(this)}>
                    <View>
                      <Text style={styles.buttonText}>Login</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => {
                    this.setLoginModalVisible(!this.state.loginModalVisible)
                  }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        </View> 
      );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  tabBarNavigator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  loginModal: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40
  },
  loginModalInput: {
    marginTop: 0,
    marginBottom: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#3b5998',
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingTop: 5
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});