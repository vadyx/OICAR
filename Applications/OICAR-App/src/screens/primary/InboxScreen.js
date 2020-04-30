import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Button from '../../components/Button';
import { theme } from '../../utils/theme';

const { height, width } = Dimensions.get('window');

const InboxScreen = props => {
  return (
    <View style={styles.wrapper}>
      
      <Text style={styles.textstyle}>
        Ups!
      </Text>
      
      <Text style={styles.textstyle1}>
         Prvo se morate prijaviti da biste vidjeli sadržaj
      </Text>
    
      <Image 
        source={require('../../assets/user_not_login.gif')}  
        style={styles.image}
        />
        
      <Button mode="contained" onPress={() => props.navigation.navigate('Login')} style={styles.buttonstyle}>
        Prijava
      </Button>
    
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    paddingTop:70
  },
  buttonstyle:{
    alignSelf:"center",
    paddingVertical:2,
    margin:0,
    marginTop:0,
    width:"50%"
  },
  textstyle:{
    fontSize: 40,
    fontWeight: '700',
    alignSelf:"flex-start",
    marginLeft:20,
  },
  textstyle1:{
    fontSize:14,
    fontWeight:"100",
    marginLeft:20,
  },
  image:{
    width: 400,
    height: 350,
    alignSelf:"center" 

  }
});

export default InboxScreen;