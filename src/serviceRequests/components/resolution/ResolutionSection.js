import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import CurrentResolution from './CurrentResolution';
import ResolutionPending from './ResolutionPending';
import ResolutionForm from './ResolutionForm';
import SectionWithIcon from '../SectionWithIcon';
import { Button } from '../../../shared';
import timeIcon from '../img/time-icon-active.png';
import { resolutionCodeDisplayName } from '../../helpers';


function ResolvedState({ serviceRequest }) {
  // TODO: Need to work this out. Resolution status already appears
  // below, do we need to display it differently here?
  return null;
  /*return (
    <View>
      <Text>Resolution</Text>
      <Text>{resolutionCodeDisplayName(serviceRequest.resolution_code)}</Text>
      <Text>{serviceRequest.resolution_notes}</Text>
    </View>
  );*/
}

function UnresolvedState({ goToResolutionScreen }) {
    return (
      <View style={{ padding: 10}}>
        <SectionWithIcon icon={timeIcon}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, alignSelf: 'center'}}>
              <Text style={{fontSize: 20}}>Resolution</Text>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              <Button
                style={{width: 50, height: 50, borderRadius: 25}}
                textStyle={{fontSize: 25}}
                onPress={goToResolutionScreen}>+</Button>
            </View>
          </View>
        </SectionWithIcon>
      </View>
    );
}

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
      return <ResolvedState serviceRequest={serviceRequest} />
    }

    return null;
  }
}

ResolutionSection.propTypes = {
  navigator: PropTypes.object,
  updatePending: PropTypes.string,
  serviceRequest: PropTypes.object.isRequired,
};
