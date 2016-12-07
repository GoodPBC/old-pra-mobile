import React, { Component, PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Separator, Button } from '../../shared';

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
        <Text style={styles.label}>Contacts</Text>
        {
          contacts.map( (contact, key) => {
            return (
              <ContactDetail key={key} contact={contact} />
            );
          })
        }
        <Button onPress={ () => {this._goToAddContactsNumber()} } >Add Contacts</Button>
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
  label: {
    fontWeight: 'bold',
  },
  contactWrapper: {
    paddingTop: 3,
    paddingBottom: 3,
  }
});

class ContactDetail extends Component {
  
  constructor(props){
    super(props);
  }

  render(){
    const contact = this.props.contact;

    return (
      <View>
        <Text style={styles.contactWrapper}>Contact {contact.id}: {contact.description}</Text>
        <Separator />
      </View>
    );
  }
}

ContactDetail.propTypes = {
  contact: PropTypes.object.isRequired,
};
