import React from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  Text,
  Image,
  Platform,
  Linking,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';

import mapIcon from './img/icon-map.png';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
  },
  actionSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  actionButton: {
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  actionButtonText: {
    backgroundColor: 'transparent',
  },
})


function getEncodedURIForDirection(serviceRequest) {
  const { address, cross_streets, borough, city, state, zip } = serviceRequest;
  let destination;
  if (!address || !address.length) {
    destination = [cross_streets, borough, city, state, zip].join('+');
  } else {
    destination = [address, borough, city, state, zip].join('+');
  }
  return encodeURI(`https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${destination}`);
}


export default class MapIconActionSheet extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.getActionSheetOptions = this.getActionSheetOptions.bind(this);
  }

  hideModal() {
    this.setModalVisible(false);
  }

  showModal() {
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showServiceRequest(serviceRequest) {
    this.hideModal();
  }

  getDirection(serviceRequest) {
    const url = getEncodedURIForDirection(serviceRequest);
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Alert.alert(
          'You are now leaving the application. Would you like to continue?',
          null,
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


  onClickMapIcon() {
    Platform.OS === 'ios' ? this.showActionSheetIOS() : this.showActionSheetAndroid();
  }

  showActionSheetIOS() {
    const optionList = this.getActionSheetOptions();

    const options = optionList.map(option => option.text);
    const cancelButtonIndex = optionList.findIndex(option => option.text === 'Cancel');
    const callbacks = optionList.map(option => option.callback);

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    }, (buttonIndex) => {
      callbacks[buttonIndex]();
    })
  }

  getActionSheetOptions() {
    const { serviceRequest } = this.props;
    return [
      {
        text: 'View on Map',
        callback: this.showServiceRequest.bind(this, serviceRequest),
      },
      {
        text: 'Get Directions',
        callback: this.getDirection.bind(this, serviceRequest),
      },
      {
        text: 'Cancel',
        callback: this.hideModal,
      }
    ]
  }

  showActionSheetAndroid() {
    this.showModal();
  }

  renderActionButtons() {
    const options = this.getActionSheetOptions();
    return (
      <View style={styles.buttonContainer}>
        {
          options.map((option, i) => {
            return (
              <TouchableHighlight
                key={i}
                underlayColor="papayawhip"
                onPress={option.callback}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>{option.text}</Text>
              </TouchableHighlight>
            );
          })
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.center}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}
        >
          <View style={styles.actionSheetContainer}>
            <TouchableOpacity style={styles.flex} onPress={this.hideModal}/>
            {this.renderActionButtons()}
          </View>
        </Modal>
        <TouchableOpacity onPress={this.onClickMapIcon} style={styles.center}>
          <Image source={mapIcon}/>
        </TouchableOpacity>
      </View>
    )
  }
}
