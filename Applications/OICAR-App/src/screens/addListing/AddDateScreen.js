import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DateTimePicker from '@react-native-community/datetimepicker';
import NextScreenButton from '../../components/NextScreenButton';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import { theme } from '../../utils/theme';
import { Fontisto } from '@expo/vector-icons';

const AddDateScreen = props => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      console.log(currentDate);
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <Text style={styles.headerstyle}>Raspoloživost vozila</Text>
        <View style={styles.boxstyle}>
            <Text style={styles.lblstyle}>Od</Text>
           <TouchableOpacity style={styles.tostyle} onPress={showDatepicker}>
                <Fontisto name="date" size={24} color={theme.colors.primary}/>
                <Text style={styles.labelstyle}>20.06.2020.</Text>
           </TouchableOpacity>
        </View>
        
        <View style={styles.boxstyle}>
            <Text style={styles.lblstyle}>Do</Text>
            <TouchableOpacity style={styles.tostyle} onPress={showDatepicker}>
                <Fontisto name="date" size={24} color={theme.colors.primary}/>
                <Text style={styles.labelstyle}></Text>
            </TouchableOpacity>
        </View>
           
           {show && (
            <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="calendar"
            onChange={onChange}
            minimumDate={new Date()}
            />
        )}

      <NextScreenButton navigate={() => props.navigation.navigate('AddPictures')} />
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
    paddingBottom:60,
    marginTop:100

  },
  labelstyle:{
      fontSize:23,
      fontWeight:"200",
      marginHorizontal:20,
      width:150
  },
  lblstyle:{
    fontSize:20,
    marginVertical:5,
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
});

export default AddDateScreen;