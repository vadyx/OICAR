import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements';

import BackButton from '../../components/BackButton';
import NextScreenButton from '../../components/NextScreenButton';
import DatePicker from '../../components/DatePicker';
import { theme } from '../../utils/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

const currentDate = moment().toDate();
let nextDayDate = moment(currentDate).add(1, 'days').toDate();

const ReservationDateScreen = props => {

  const _onNextPressed = async () => {

      props.navigation.navigate('ListingDetails');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1,width:"100%",height:"100%"}}>
      <BackButton style={styles.back} goBack={() => props.navigation.goBack()} />
      <Text style={styles.headerstyle}>Rezervacija</Text>
        <Text style={styles.headerstyle2}>1/3</Text>

        <View style={styles.datecontainer}>
          <DatePicker
            id='startDate'
            label="Od"
            date={currentDate}     
            style={styles.labelstyle}
            labelsize={18}
            labelfontweight="bold"
            labelcolor={theme.colors.lightplusgrey}  
          />

          <DatePicker
            id='endDate'
            label="Do"
            date={nextDayDate}
            style={styles.labelstyle}
            labelsize={18}
            labelfontweight="bold"
            labelcolor={theme.colors.lightplusgrey}
          />
        </View>

        <Input 
          containerStyle={styles.input}
          label='Ime'
          labelStyle={styles.inputlabel}
          placeholder='Vilko' 
          disabled
          inputContainerStyle={styles.inputinside}
          inputStyle={styles.textinput}
        />
        <Input 
          containerStyle={styles.input} 
          label='Prezime'
          labelStyle={styles.inputlabel}
          placeholder='Jugovic'
          disabled
          inputContainerStyle={styles.inputinside}
        />
        <Input 
          placeholder='user@mail.com'
          label='E-mail'
          labelStyle={styles.inputlabel}
          disabled
          containerStyle={styles.input} 
          leftIcon={<MaterialIcons name="email" size={20} color={theme.colors.lightgrey} />}
          leftIconContainerStyle={styles.iconstyle}
          inputStyle={styles.textinput}
        />
        <Input 
          placeholder='npr. 00385911234567'
          placeholderTextColor={theme.colors.lightplusgrey}
          keyboardType="decimal-pad"
          label='Telefon'
          labelStyle={styles.inputlabel}
          containerStyle={styles.input}
          leftIcon={<MaterialIcons name="phone" size={20} color={theme.colors.lightgrey} />}
          leftIconContainerStyle={styles.iconstyle}
          inputStyle={styles.textinput}
        />

        <View style={styles.pricebox}>
          <Text style={styles.pricetextstyle}>Cijena ukupno:</Text>
          <Text style={styles.pricetextstyle1}>450 kn</Text>
        </View>
        <TouchableOpacity style={styles.detailboxstyle}>
          <Text style={styles.detailprice}> - Pogledajte detalje cijene</Text>
        </TouchableOpacity>
        
      </ScrollView>
      <NextScreenButton
        navigate={_onNextPressed}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 32,
    marginTop:50,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '700',
  },
  headerstyle2: {
    fontSize: 22,
    marginTop:5,
    marginBottom:50,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
    width:"80%",
    marginLeft:10,
  },
  inputinside:{
    paddingLeft:10,
  },
  inputlabel:{
    color:theme.colors.lightplusgrey,
    fontSize:17
  },
  iconstyle:{
    paddingRight:20
  },
  back:{
    marginTop:-getStatusBarHeight()
  },
  textinput:{
    color:theme.colors.primary
  },
  labelstyle:{
    width:80,
    fontSize:15
  },
  datecontainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:20,
    paddingBottom:20,
  },
  pricebox:{
    flexDirection:"row",
    marginTop:50,
    marginLeft:20
  },
  pricetextstyle:{
    fontWeight:"bold",
    fontSize:24,
    color:theme.colors.primary
  },
  pricetextstyle1:{
    fontWeight:"500",
    fontSize:24,
    paddingLeft:10,
    color:theme.colors.black
  },
  detailprice:{
    color:theme.colors.primary
  },
  detailboxstyle:{
    marginLeft:40,
    marginBottom:20,
  }
});

export default ReservationDateScreen;