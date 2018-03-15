import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import StatusWithTime from './StatusWithTime';
import timeIcon from './img/time-icon-inactive.png';

import { formattedStatus, resolutionCodeDisplayName } from '../helpers';

export default function TimeSection({ serviceRequest }) {
  return (
    <SectionWithIcon icon={timeIcon}>
      <View>
        <Text style={styles.header}>{formattedStatus(serviceRequest)}</Text>
        <StatusWithTime serviceRequest={serviceRequest} />
        {
          serviceRequest.resolution_code &&
          <Text style={{ fontWeight: 'bold' }}>
            {resolutionCodeDisplayName(serviceRequest.resolution_code)}
          </Text>
        }
        {
          serviceRequest.resolution_notes &&
          <Text numberOfLines={3}>
            {`"${serviceRequest.resolution_notes}"`}
          </Text>
        }
      </View>
    </SectionWithIcon>
  );
}

TimeSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});