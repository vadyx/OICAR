import React,{useState} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import Input from '../../components/Input';
import NextScreenButton from '../../components/NextScreenButton';
import * as newListingActions from '../../store/actions/newListing';
import { theme } from '../../utils/theme';


const AddMapScreen = props => {

  const _onNextPressed = () => {
    props.navigation.navigate('AddLocation');
  };

  return (
    <View style={styles.container}>
        
        <View style={{}}>
        <Image source={require('../../assets/googlemap.png')} style={styles.map}/>
        </View>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <NextScreenButton 
          style={styles.nsbstyle} 
          disabled
          navigate={_onNextPressed}>
          <Text style={styles.nsbtextstyle}>Potvrdi</Text>
        </NextScreenButton>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:getStatusBarHeight(),
        backgroundColor:theme.colors.white
    },
    backandexit:{
        marginTop:-getStatusBarHeight()
    },
    map:{
     width:"100%",
     height:"100%"
    },
    nsbstyle:{
        height:50,
        width:150,
        position:"absolute",
        paddingLeft:20,
        flexDirection:"row"
      },
      nsbtextstyle:{
        fontSize:20,
        paddingBottom:5,
        fontWeight:"600",
        color:theme.colors.white
      },
});

export default AddMapScreen;