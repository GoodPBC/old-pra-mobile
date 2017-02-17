import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import StatusWithTime from './StatusWithTime';
import timeIcon from './img/time-icon-active.png';

export default function TimeSection({ serviceRequest }) {
  return (
    <SectionWithIcon icon={timeIcon}>
      <View>
        <Text style={styles.header}>{serviceRequest.formatted_status}</Text>
        <StatusWithTime serviceRequest={serviceRequest} />
        {serviceRequest.resolution && <Text style={{ fontWeight: 'bold' }}>{serviceRequest.resolution.display_name}</Text>}
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