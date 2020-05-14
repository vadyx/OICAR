import React,{useState} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import Input from '../../components/InputDescription';
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';
import { ScrollView } from 'react-native-gesture-handler';

let data = [{
    label:'2017',
    value: '2017',
  }, {
    label:'2018',
    value: '2018',
  }, {
    label:'2019',
    value: '2019'
  }];

const placeholder = {
    label: 'Godište vozila',
    value: null,
    };  

const AddPriceScreen = props => {

  const [selectedValue, setSelectedValue] = useState("sat");

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollview}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <View style={styles.contentstyle}>     
            <Text style={styles.headerstyle}>Cijena vozila</Text>
            <View style={{flexDirection:"row",justifyContent:"center"}}>
            <Input 
                keyboardType = 'numeric'
                style={styles.input}/>
            <Picker
                selectedValue={selectedValue}
                mode="dropdown"
                style={{ height: 20, width: 135, alignSelf:"center", color:theme.colors.primary}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label=" po satu" value="sat" />
                <Picker.Item label=" po danu" value="dan" />
                <Picker.Item label=" po tjednu" value="tjedan" />
            </Picker>
            </View>
        </View>
        </ScrollView>
        <NextScreenButton navigate={() => props.navigation.navigate('')} />
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
    width:"80%",
    marginTop:130,
    alignSelf:"center"
  },
  headerstyle: {
    fontSize: 32,
    paddingBottom:50,
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
      alignSelf:"center",
      width:"40%",
      height:45
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
});

export default AddPriceScreen;