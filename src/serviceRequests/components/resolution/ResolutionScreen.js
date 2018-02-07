import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ResolutionForm from './ResolutionForm';
import BannerWithNumber from '../BannerWithNumber';

export default class ResolutionScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <BannerWithNumber serviceRequest={this.props.serviceRequest} />
          <ResolutionForm {...this.props} />
        </View>
      </ScrollView>
    );
  }
}

ResolutionScreen.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
});
