import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons'; 
import { theme } from '../../utils/theme';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import { Dropdown } from 'react-native-material-dropdown';

const AddBrand = props => {

     let data = [{
      value: 'Audi',
    }, {
      value: 'Bmw',
    }, {
      value: 'Mercedes'
    }];

    let sub_data = [{
        value: 'A1',
    }, {
      value: 'A2',
    }, {
      value: 'A3',
    }];

  return (
    <View style={styles.container}>
        <BackButton goBack={() => props.navigation.goBack()} />
        <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <View style={styles.contentstyle}>
      <Text style={styles.headerstyle}>Odaberite marku vozila</Text>
      <Dropdown
        label='Marka vozila'
        data={data}
      />
      <Dropdown
        label='Model vozila'
        data={sub_data}
      />
        </View>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('')}>
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

export default AddBrand;