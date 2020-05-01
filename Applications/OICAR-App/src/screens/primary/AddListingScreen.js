import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import NotLoggedInView from '../../components/NotLoggedInView';

const AddListingScreen = props => {
  return (
    <NotLoggedInView 
      imageUri={require('../../assets/user_not_login.gif')} 
      titleText='Ups!'
      contentText='Prvo se morate prijaviti da biste vidjeli sadržaj'
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
});

export default AddListingScreen;