import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../utils/theme';

import NotLoggedInView from '../../components/NotLoggedInView';

const InboxScreen = props => {
  return (
    <NotLoggedInView 
      titleText='Ups!'
      contentText='Prijavite se kako biste vidjeli dolazne poruke'
      navigation={props.navigation}>

      <MaterialCommunityIcons name="email-lock" size={220} color={theme.colors.lightgrey} style={styles.iconstyle}/>
    
    </NotLoggedInView>
  );
}

const styles = StyleSheet.create({
  iconstyle:{
    alignSelf:"center",
    marginTop:30
  }
});

export default InboxScreen;