import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Button,
  Separator,
} from '../../../shared';
import resolutionIcon from '../img/icon-resolution.png';

// TODO: Need to work this out. Resolution status already appears
// below, do we need to display it differently here?
const ResolvedState = () => null;
const UnresolvedState = ({ goToResolutionScreen }) => (
  <View style={{ paddingHorizontal: 10 }}>
    <View style={{ paddingVertical: 10 }}>
      <View style={styles.container}>
        <Image source={resolutionIcon} />
        <View style={styles.content}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text style={{ fontSize: 20 }}>Resolution</Text>
            </View>
            <Button
              style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'flex-end' }}
              textStyle={{ fontSize: 25 }}
              onPress={goToResolutionScreen}
            >+</Button>
          </View>
        </View>
      </View>
    </View>
    <Separator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    // marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
});

class ResolutionSection extends Component {
  constructor(props) {
    super(props);
    this._goToResolutionScreen = this._goToResolutionScreen.bind(this);
  }

  _goToResolutionScreen() {
    this.props.navigation.navigate('Resolution');
  }

  render() {
    const { serviceRequest } = this.props;
    
    if (serviceRequest.status === 'on_site') {
      return <UnresolvedState goToResolutionScreen={this._goToResolutionScreen} />;
    } else if (serviceRequest.status === 'visit_complete') {
      return <ResolvedState serviceRequest={serviceRequest} />;
    }

    return null;
  }
}

ResolutionSection.propTypes = {
  navigation: PropTypes.object,
  serviceRequest: PropTypes.object.isRequired,
};

export default withNavigation(ResolutionSection);
