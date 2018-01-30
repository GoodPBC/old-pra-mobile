import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import backgroundImage from './img/Background.png';

export default class ImageContainer extends React.Component {
  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.image}
        {...this.props}
      >
        {this.props.children}
      </ImageBackground>
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
