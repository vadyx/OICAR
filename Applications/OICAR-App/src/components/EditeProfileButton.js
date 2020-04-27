import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BackButton = props => (
  <TouchableOpacity style={styles.container}>
    <Image style={styles.image} source={require('../assets/edit.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 300,
  },

  image: {
    width: 30,
    height: 30,
  }
});

export default memo(BackButton);
