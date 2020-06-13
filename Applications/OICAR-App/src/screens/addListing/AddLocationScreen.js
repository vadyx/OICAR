import React,{useState} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import Input from '../../components/Input';
import NextScreenButton from '../../components/NextScreenButton';
import * as newListingActions from '../../store/actions/newListing';
import { theme } from '../../utils/theme';
import { Button } from 'react-native-paper';

const AddLocationScreen = props => {

    const _onNextPressed = () => {

        props.navigation.navigate('AddPictures');
        };

    const _onPressed = () => {

        props.navigation.navigate('AddMap');
        };

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <Text style={styles.headerstyle}>Lokacija vozila</Text>
        <Image source={require('../../assets/mapimg.png')} style={styles.img}></Image>
        {/*<View style={styles.descriptionbox}>
            <Text style={styles.descriptiontext}>Ilica 242</Text>
            <Text style={styles.descriptiontext}>10000, Zagreb</Text>
            <Text style={styles.descriptiontext}>Hrvatska</Text>
        </View>
        */}
        <NextScreenButton 
          style={styles.nsbstyle} 
          navigate={_onPressed}>
          <Text style={styles.nsbtextstyle}>Odaberite na mapi</Text>
        </NextScreenButton>


      <NextScreenButton 
        disabled
        navigate={_onNextPressed} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(),
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 32,
    paddingBottom:40,
    textAlign:"center",
    fontWeight: '700',
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
  img:{
      width:"75%",
      height:"35%",
      borderRadius:20,
  },
  nsbstyle:{
    height:50,
    width:230,
    bottom:null,
    right:null,
    position:"relative",
    paddingLeft:20,
    flexDirection:"row"
  },
  nsbtextstyle:{
    fontSize:20,
    paddingBottom:5,
    fontWeight:"600",
    color:theme.colors.white
  },
  descriptionbox:{
      marginTop:10,
      marginBottom:20
  },
  descriptiontext:{
      textAlign:"center",
      fontSize:18,
      fontWeight:"400"
  }
});

export default AddLocationScreen;