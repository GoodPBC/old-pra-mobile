import PropTypes from 'prop-types';
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
  Separator,

} from '../../shared';

export default function ContactDetail() {
  const contact = this.props.contact;

  return (
    <View>
      <Text style={styles.contactWrapper}>Contact {contact.id}: {contact.description}</Text>
      <Separator />
    </View>
  );
}

ContactDetail.propTypes = {
  contact: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  contactWrapper: {
    paddingTop: 3,
    paddingBottom: 3,
  },
});