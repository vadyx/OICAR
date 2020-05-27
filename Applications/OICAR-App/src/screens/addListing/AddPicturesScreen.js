import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import NextScreenButton from '../../components/NextScreenButton';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import PictureBox from '../../components/AddPicturesBox';
import ImagePicker from '../../components/ImagePicker';
import MultiImageModal from '../../components/MultiImageModal';
import { theme } from '../../utils/theme';
import ModalSuccess from '../../components/ModalSuccess';


const AddPicturesScreen = props => {
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const _onModalShow = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      props.navigation.navigate('Add');
    },
    3000);
  }

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <Text style={styles.headerstyle}>Slike vozila</Text>
        <View style={styles.pictureboxcontainer}>
            <PictureBox/>
            <PictureBox/>
            <PictureBox/>
            <PictureBox/>
            <PictureBox/>
        </View>

        <ImagePicker 
          style={styles.ipstyle}
          multiImage
        >
          <Text style={styles.butontextstyle}>Dodaj slike</Text>
        </ImagePicker>

        <Text style={styles.labelstyle}>*Možete dodati do 5 slika!</Text>

        <NextScreenButton style={styles.nsbstyle} navigate={_onModalShow}>
          <Text style={styles.nsbtextstyle}>Objavite oglas</Text>
        </NextScreenButton>

        <MultiImageModal />
        <ModalSuccess visible={modalVisible}/>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:getStatusBarHeight(),
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor:theme.colors.white
  },
  tostyle:{
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:10,
      paddingVertical:10,
      borderWidth:1,
      borderRadius:10,
      borderColor:theme.colors.lightplusgrey
  },
  boxstyle:{
    flexDirection:"column",
    alignItems:"flex-start",
    paddingBottom:20
  },
  headerstyle:{
    fontSize:32,
    fontWeight:"700",
    paddingBottom:20,
    marginTop:100

  },
  labelstyle:{
      fontSize:12,
      fontWeight:"200",
      marginVertical:10,
      alignSelf:"center"
  },
  lblstyle:{
    fontSize:13,
    fontWeight:"500",
    marginVertical:5,
    marginHorizontal:20
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
  buttonstyle:{
      borderWidth:1,
      color:"transparent",
      borderRadius:10,
      borderColor:theme.colors.primary,
      width:150,
      justifyContent:"center",
      alignItems:"center",
      height:50,
  },
  butontextstyle:{
    fontSize:18,
    color:theme.colors.primary,
    paddingVertical:8,
    fontWeight:"900"
  },
  pictureboxcontainer:{
      flexDirection:"row",
      paddingTop:100,
      paddingBottom:100,
  },
  ipstyle:{
    width:150,
    height:50,
    backgroundColor:"transparent",
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
    shadowColor: "#ffffff",
        //iPhone 
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
    elevation:0,
    borderColor:theme.colors.primary

  },
  ibstyle: {
    position: 'absolute',
    bottom: 0,
    height: 300
  },
  nsbstyle:{
    height:50,
    width:200,
    paddingLeft:20,
    flexDirection:"row"
  },
  nsbtextstyle:{
    fontSize:20,
    paddingBottom:5,
    fontWeight:"600",
    color:theme.colors.white
  },
  modalstyle:{
    flex:1,
    backgroundColor:"red"
  },
});

export default AddPicturesScreen;