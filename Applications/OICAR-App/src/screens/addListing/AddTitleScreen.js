import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Input } from 'react-native-elements';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';

const AddTitleScreen = props => {

  return (
    <View style={styles.container}>
      <BackButton goBack={() => props.navigation.goBack()} />
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <View style={styles.contentstyle}>     
        <Text style={styles.headerstyle}>Unesite naziv vašega oglasa</Text>
        <Input placeholder='npr. Audi A3 ...' />
      </View>

      <NextScreenButton navigate={() => props.navigation.navigate('')} />

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

export default AddTitleScreen;