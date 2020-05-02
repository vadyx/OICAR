import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NotLoggedInView from '../../components/NotLoggedInView';
import { theme } from '../../utils/theme';

const AddListingScreen = props => {
  return (
    <NotLoggedInView 
      titleText='Ups!'
      contentText='Prvo se morate prijaviti kako biste iznajmili svoje vozilo'
      navigation={props.navigation}>

      <MaterialCommunityIcons name="folder-lock" size={220} color={theme.colors.lightgrey} style={styles.iconstyle}/>

    </NotLoggedInView>
  );
}

const styles = StyleSheet.create({
  iconstyle:{
    alignSelf:"center",
    marginTop:30
  }
});

export default AddListingScreen;