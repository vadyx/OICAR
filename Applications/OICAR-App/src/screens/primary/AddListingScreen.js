import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import NotLoggedInView from '../../components/NotLoggedInView';
import { theme } from '../../utils/theme';

const AddListingScreen = props => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if(!isLoggedIn){
    return(
      <NotLoggedInView 
        titleText='Ups!'
        contentText='Prvo se morate prijaviti kako biste iznajmili svoje vozilo'
        navigation={props.navigation}>

        <MaterialCommunityIcons name="folder-lock" size={220} color={theme.colors.lightgrey} style={styles.iconstyle}/>

      </NotLoggedInView>
    );
  }

  return (
    <View style={styles.container}>
    <Text style={styles.headerstyle}>Želite iznajmiti svoje vozilo?</Text>
    <Text style={styles.paragraphstyle}>Kliknite na gumb te kroz nekoliko kratkih koraka iznajmite svoje vozilo već sada</Text>
    <View style={styles.lblstyle}>
    <FontAwesome name="hand-o-down" size={200} color={theme.colors.lightgrey} style={styles.iconstyle1} />
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => props.navigation.navigate('AddCategory')}>
      <Text style={styles.buttonText}>Iznajmi vozilo</Text>
    </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  iconstyle:{
    alignSelf:"center",
    marginTop:30
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:"center",
    backgroundColor: theme.colors.white,
    paddingTop:20
},
headerstyle: {
    fontSize: 40,
    marginTop:60,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom:5
},
paragraphstyle:{
    fontSize: 14,
    width:"90%",
    fontWeight: '100'
},
buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    alignItems:"center",
    width:200,
    height:50,
    elevation:5,
},
buttonText: {
    fontSize: 20,
    fontWeight:"500",
    color: theme.colors.white
},
iconstyle1:{
    marginHorizontal:60,
    marginVertical:40
},
lblstyle:{
  flex:1,
  marginTop:-60,
  justifyContent:"center",
  alignItems:"center"
}
});

export default AddListingScreen;