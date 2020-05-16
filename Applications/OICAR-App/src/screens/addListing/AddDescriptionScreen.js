import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import Input from '../../components/InputDescription';
import { theme } from '../../utils/theme';
import { ScrollView } from 'react-native-gesture-handler';

const AddDescriptionScreen = props => {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <View style={styles.contentstyle}>     
          <Text style={styles.headerstyle}>Detaljan opis vozila</Text>
          <Text style={styles.paragraphstyle}>Detaljno opišite svoje vozilo</Text>
          <Input 
          label = "Opis vozila"
          multiline={true}
          numberOfLines = {10}
          />
        </View>
      </ScrollView>
      <NextScreenButton navigate={() => props.navigation.navigate('AddPrice')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  scrollview:{
    flex:1
  },
  contentstyle:{
    marginTop:100,
    width:"80%",
    alignSelf:"center",
  },
  headerstyle: {
    alignSelf:"flex-start",
    fontSize: 32,
    paddingBottom:10,
    textAlign:"center",
    fontWeight: '700',
  },
  paragraphstyle: {
    fontSize: 16,
    paddingBottom:40,
    alignSelf:"flex-start",
    fontWeight: "300"
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  }
});

export default AddDescriptionScreen;