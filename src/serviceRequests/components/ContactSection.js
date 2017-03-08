import React, { Component, PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
  Separator,
  LIGHT_BLUE,
  InvertButton
} from '../../shared';

import ContactDetail from './ContactDetail';

export default class ContactSection extends Component {

  constructor(props) {
    super(props);

    this._goToAddContactsNumber = this._goToAddContactsNumber.bind(this);
  }

  _goToAddContactsNumber() {
    this.props.navigator.push({
      index: 3,
      title: 'Add Contact'
    });
  }

  render() {
    const contacts = this.props.contacts;
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContainerInner}>
          <Text style={styles.header}>Contacts</Text>
          {
            contacts.length === 0 ?
              <Text>Currently no contacts added to Service Request.</Text>
            :
              contacts.map((contact, key) => (
                  <ContactDetail key={key} contact={contact} />
                ))
            }
          <InvertButton
            onPress={ () => { this._goToAddContactsNumber(); } }
            style={styles.invertButton}
            textStyle={styles.invertButtonText}
          >
            Add Contacts
            </InvertButton>
          </View>
        <Separator />
      </View>
    );
  }
}

ContactSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  detailsContainerInner: {
    paddingLeft: 30,
    paddingBottom: 10,
    marginBottom: 10
  },
  header: {
    color: LIGHT_BLUE,
    marginBottom: 3,
  },
  contactWrapper: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  invertButton: {
    borderColor: LIGHT_BLUE,
    flex: 2,
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  invertButtonText: {
    fontSize: 14,
    color: LIGHT_BLUE
  }
});

