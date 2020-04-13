import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo_oicar.png')} style={styles.image} />
);

const Logo2 = () => (
  <Image source={require('../assets/logo_oicar.png')} style={styles.image1} />
);



const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
  image1: {
    width: 30,
    height: 30,
    marginBottom: 12,
  },
});

export default memo(Logo);
