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
import RNPickerSelect from 'react-native-picker-select';
import { Divider } from 'react-native-elements';

const AddBrandScreen = props => {

    let data = [{
      label:'Audi',value: 'Audi',
    }, {
      label:'Bmw',value: 'Bmw',
    }, {
      label:'Mercedes',value: 'Mercedes'
    }];

    let sub_data = [{
      label:'Audi A1',value: 'A1',
    }, {
      label:'Audi A2',value: 'A2',
    }, {
      label:'Audi A3',value: 'A3',
    }];

    const placeholder = {
      label: 'Odaberite marku vozila',
      value: null,
      color:theme.colors.lightgrey
  };
  const placeholder_model = {
    label: 'Odaberite model vozila',
    value: null,
    color:theme.colors.lightgrey

    
};

  return (
    <View style={styles.container}>
      <BackButton goBack={() => props.navigation.goBack()} />
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      
      <View style={styles.contentstyle}>
        <Text style={styles.headerstyle}>Marka i model vozila</Text>
        <View style={styles.rnpstyle}>

          <RNPickerSelect
              placeholder={placeholder}
              onValueChange={(value) => console.log(value)}
              items={data}
              style={{
                placeholder: {
                  color: theme.colors.primary,
                  fontSize: 12,
                  fontWeight: 'bold',
                },
              }}
          />

          <Divider style={{ backgroundColor: 'black', marginVertical:15 }} />
          
          <RNPickerSelect
              placeholder={placeholder_model}
              onValueChange={(value) => console.log(value)}
              items={sub_data}
              disabled={true}
          />

        </View>
      </View>

      <NextScreenButton navigate={() => props.navigation.navigate('AddTitle')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: theme.colors.white
  },
  contentstyle:{
    marginTop:-70,
    width:"80%",
  },
  headerstyle: {
    fontSize: 32,
    textAlign:"center",
    fontWeight: '700',
  },
  rnpstyle:{
    marginTop:50
  }
});

export default AddBrandScreen;