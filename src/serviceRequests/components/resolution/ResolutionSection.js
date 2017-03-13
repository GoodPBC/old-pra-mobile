import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Separator,
} from '../../../shared';
import resolutionIcon from '../img/icon-resolution.png';

function ResolvedState() {
  // TODO: Need to work this out. Resolution status already appears
  // below, do we need to display it differently here?
  return null;
}

function UnresolvedState({ goToResolutionScreen }) {
    return (
      <View style={{ padding: 10 }}>
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
                  onPress={goToResolutionScreen}>+</Button>
            </View>
          </View>
        </View>

        <Separator />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
});

export default class ResolutionSection extends Component {
  _goToResolutionScreen() {
    this.props.navigator.push({
      index: 4,
      title: 'Request Details',
    });
  }

  render() {
    const { serviceRequest } = this.props;
    if (serviceRequest.status === 'on_site') {
      return <UnresolvedState goToResolutionScreen={() => this._goToResolutionScreen()} />;
    } else if (serviceRequest.status === 'visit_complete') {
      return <ResolvedState serviceRequest={serviceRequest} />;
    }

    return null;
  }
}

ResolutionSection.propTypes = {
  navigator: PropTypes.object,
  serviceRequest: PropTypes.object.isRequired,
};
