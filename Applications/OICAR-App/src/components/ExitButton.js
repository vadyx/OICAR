import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AntDesign} from '@expo/vector-icons'; 

const ExitButton = props => (
  <TouchableOpacity onPress={props.goBack} style={styles.container}>
   <AntDesign name="closecircleo" size={30} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    right: 15,
  }
});

export default memo(ExitButton);
