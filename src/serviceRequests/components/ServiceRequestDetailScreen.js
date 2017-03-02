import React, { PropTypes } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ResolutionSection from '../containers/ResolutionSection';
import ContactSection from '../containers/ContactSection';
import DetailsSection from './DetailsSection';
import OnsiteSection from './OnsiteSection';
import {
  DARK_BLUE,
  Separator,
} from '../../shared';

export default function ServiceRequestDetailScreen(props) {
  const canGoOnsite = props.serviceRequest.status === 'in_the_field';

  return (
    <View style={styles.container}>
      <ScrollView>
        { canGoOnsite ?
          (
            <OnsiteSection {...props} />
          ) : null
        }
        <ResolutionSection {...props} />
        <DetailsSection serviceRequest={props.serviceRequest} />
      </ScrollView>
    </View>
  );
}

ServiceRequestDetailScreen.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: 'gray',
    fontVariant: ['small-caps'],
  },
});
