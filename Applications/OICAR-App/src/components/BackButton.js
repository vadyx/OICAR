import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AntDesign} from '@expo/vector-icons'; 

const BackButton = props => (
  <TouchableOpacity onPress={props.goBack} style={{...styles.container,...props.style}}>
   <AntDesign name="arrowleft" size={30} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 15,
  }
});

export default memo(BackButton);
