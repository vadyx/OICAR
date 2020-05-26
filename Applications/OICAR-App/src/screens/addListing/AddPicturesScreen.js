import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NextScreenButton from '../../components/NextScreenButton';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import PictureBox from '../../components/AddPicturesBox';
import ImagePicker from '../../components/ImagePicker';
import { theme } from '../../utils/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddPicturesScreen = props => {

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

      <NextScreenButton navigate={() => props.navigation.navigate('')} />
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

  }
});

export default AddPicturesScreen;