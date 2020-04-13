import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = props => (
  <Image source={require('../assets/logo_oicar.png')} style={{...styles.image, ...props.style}} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
