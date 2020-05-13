import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { theme } from '../../utils/theme';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import { Dropdown } from 'react-native-material-dropdown';

const AddBrandScreen = props => {

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

      <NextScreenButton navigate={() => props.navigation.navigate('AddTitle')} />

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
  }
});

export default AddBrandScreen;