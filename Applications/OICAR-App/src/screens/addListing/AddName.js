import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons'; 
import BackButton from '../../components/BackButton';
import { theme } from '../../utils/theme';
import ExitButton from '../../components/ExitButton';

const AddName = props => {
  return (
    <View style={styles.container}>
       <BackButton goBack={() => props.navigation.goBack()} />
       <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <View style={styles.contentstyle}>
      <Text style={styles.headerstyle}>Unesite naziv vašega oglasa</Text>
      <Input 
        placeholder='npr. Audi A3 ...'/>
        </View>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('AddBrand')}>
        <MaterialIcons name="navigate-next" size={50} color={theme.colors.white} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    backgroundColor: theme.colors.white
  },
  contentstyle:{
    marginTop:100,
    width:"80%",
  },
  headerstyle: {
    fontSize: 32,
    marginVertical:30,
    textAlign:"center",
    fontWeight: '700',
},
buttonContainer: {
  backgroundColor: theme.colors.primary,
  position:"absolute",    
  bottom: 0,
  right: 0,
  margin:20,
  width: 48,
  height: 48,
  borderRadius: 40,
  alignItems: "center",
  justifyContent: "center"
}
});

export default AddName;