import React from 'react';
import PropTypes from 'prop-types';
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

import { Tabs } from '../../shared';
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
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.showServiceRequest = this.showServiceRequest.bind(this);
    this.getDirection = this.getDirection.bind(this);
    this.onClickMapIcon = this.onClickMapIcon.bind(this);
    this.showActionSheetIOS = this.showActionSheetIOS.bind(this);
    this.getActionSheetOptions = this.getActionSheetOptions.bind(this);
    this.showActionSheetAndroid = this.showActionSheetAndroid.bind(this);
    this.renderActionButtons = this.renderActionButtons.bind(this);
    this.trackPressEvent = this.trackPressEvent.bind(this);
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
    this.props.switchTab(Tabs.MAP);
    this.props.updateTabContext(serviceRequest.sr_number);
    this.hideModal();
  }

  getDirection(serviceRequest) {
    const url = getEncodedURIForDirection(serviceRequest);
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Alert.alert(
          'You are now leaving the application. Would you like to continue?',
          '',
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

  trackPressEvent(eventLabel) {
    this.props.gaTrackEvent(
      'Interactions',
      'Pressed',
      eventLabel,
    )
  }

  onClickMapIcon() {
    this.trackPressEvent('Map Icon');
    if (Platform.OS === 'ios') {
      this.showActionSheetIOS();
    } else {
      this.showActionSheetAndroid();
    }
  }

  showActionSheetIOS() {
    const optionList = this.getActionSheetOptions();

    const options = optionList.map(option => option.text);
    const cancelButtonIndex = options.findIndex(option => option === 'Cancel');

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    }, (buttonIndex) => {
      optionList[buttonIndex].callback();
    })
  }

  getActionSheetOptions() {
    const { serviceRequest } = this.props;
    return [
      {
        text: 'View on Map',
        callback: () => {
          this.trackPressEvent('View on Map');
          this.showServiceRequest(serviceRequest);
        },
      },
      {
        text: 'Get Directions',
        callback: () => {
          this.trackPressEvent('Get Directions');
          this.getDirection(serviceRequest);
        },
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
                underlayColor="#EEE"
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
            <TouchableOpacity style={styles.flex} onPress={this.hideModal} />
            {this.renderActionButtons()}
          </View>
        </Modal>
        <TouchableOpacity onPress={this.onClickMapIcon} style={styles.center}>
          <Image source={mapIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

MapIconActionSheet.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
};
