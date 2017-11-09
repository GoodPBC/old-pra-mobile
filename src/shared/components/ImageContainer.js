import React from 'react';
import { Image, StyleSheet } from 'react-native';
import backgroundImage from './img/Background.png';

export default class ImageContainer extends React.Component {
  render() {
    return (
      <Image
        source={backgroundImage}
        style={styles.image}
        {...this.props}
      >
        {this.props.children}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
})
