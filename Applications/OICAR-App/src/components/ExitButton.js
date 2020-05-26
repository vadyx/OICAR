import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AntDesign} from '@expo/vector-icons';

import * as newListingActions from '../store/actions/newListing';

const ExitButton = props => {
  
  const dispatch = useDispatch();

  const _onClosing = async () => {
    dispatch(newListingActions.newListingClose());
    props.goBack();
  };
  
  return (
    <TouchableOpacity onPress={_onClosing} style={{...styles.container,...props.style}}>
      <AntDesign name="closecircleo" size={30} color="black" />
    </TouchableOpacity>
  );  
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    right: 15,
  }
});

export default memo(ExitButton);
