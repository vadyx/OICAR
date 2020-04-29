import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {Feather} from '@expo/vector-icons'

const BackButton = props => (
  <TouchableOpacity style={styles.container}>
    <Feather name="edit" size={30} color={"black"}/>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:5,
    alignSelf:"flex-end",
    paddingRight:10
  }
});

export default memo(BackButton);
