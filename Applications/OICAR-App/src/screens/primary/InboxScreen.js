import React from 'react';
import {
  StyleSheet
} from 'react-native';

import NotLoggedInView from '../../components/NotLoggedInView';

const InboxScreen = props => {
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
  
});

export default InboxScreen;