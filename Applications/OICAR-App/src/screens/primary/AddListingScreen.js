import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import NotLoggedInView from '../../components/NotLoggedInView';
import { theme } from '../../utils/theme';

const AddListingScreen = props => {
  return (
    <NotLoggedInView 
      style={styles.viewstyle}
      imageUri={require('../../assets/notlogin_add.jpg')} 
      titleText='Ups!'
      contentText='Prvo se morate prijaviti kako biste iznajmili svoje vozilo'
      navigation={props.navigation}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems:"center",
    justifyContent:"center",
    padding: 50,
  },
  viewstyle:{
   height:600 
  }
});

export default AddListingScreen;