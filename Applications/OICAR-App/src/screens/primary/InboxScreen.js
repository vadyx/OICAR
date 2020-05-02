import React from 'react';
import {
  StyleSheet
} from 'react-native';

import NotLoggedInView from '../../components/NotLoggedInView';

const InboxScreen = props => {
  return (
    <NotLoggedInView 
      imageUri={require('../../assets/user_not_logged_in_inbox.jpg')} 
      titleText='Ups!'
      contentText='Prijavite se kako bih ste vidjeli dolazne poruke'
      navigation={props.navigation}
    />
  );
}

const styles = StyleSheet.create({
  
});

export default InboxScreen;