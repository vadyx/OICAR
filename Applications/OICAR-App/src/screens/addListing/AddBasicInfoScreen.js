import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { theme } from '../../utils/theme';
import Input from '../../components/Input'
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import RNPickerSelect from 'react-native-picker-select';
import { Divider } from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
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

  let drive = [{
    label:'Prednji',
    value: 'Prednji',
  }, {
    label:'Zadnji',
    value: 'Zadnji',
  }, {
    label:'4X4',
    value: '4X4'
  }];

  let sub_data = [{
      label:'Dizel',value: 'Dizel',
    }, {
      label:'Benzin',value: 'Benzin',
    }, {
      label:'Plin',value: 'Plin',
    },{
      label:'Hibrid',value: 'Hibrid',
    },{
      label:'Elektro',value: 'Elektro',
    }
  ];

  let transmission = [{
      label:'Mehanički',value: 'Manual',
    }, {
      label:'Automatski',value: 'Automatic',
    }
  ];


  let type = [{
      label:'Limuzina',value: 'Limuzina',
    }, {
      label:'Mali auto',value: 'Mali auto',
    }, {
      label:'Karavan',value: 'Karavan'
    }, {
      label:'Terenac',value: 'Terenac'
    }, {
      label:'Kabriolet',value: 'Kabriolet'
    }, {
      label:'Caddy',value: 'Caddy'
    }, {
      label:'Sportski',value: 'Sportski'
    }
  ];  

  const items = [
    {
      name: 'Dodatna oprema',
      id: 0,
      /*icon: icon*/
      children: [
        {
          name: 'Park assist',
          id: 1,
        },
        {
          name: 'Vozilo prilagođeno invalidima',
          id: 2,
        },
        {
          name: 'Tempomat',
          id: 3,
        },
        {
          name: 'Navigacija',
          id: 4,
        },
        {
          name: 'Grijanje sjedala',
          id: 5,
        },
        {
          name: 'Alarm',
          id: 6,
        },
        {
          name: 'Sjedalica za djecu',
          id: 7,
        },
        {
          name: 'AUX',
          id: 8,
        },
        {
          name: 'Zimske gume',
          id: 9,
        },
      ],
    }
  ];

  const placeholder = {
    label: 'Godište vozila',
    value: null,
    color:theme.colors.lightgrey
  };

  const placeholder_drive = {
    label: 'Pogon',
    value: null,
    color:theme.colors.lightgrey
  };

  const placeholder_model = {
    label: 'Gorivo',
    value: null,
    color:theme.colors.lightgrey
  };

  const placeholder_transmission = {
    label: 'Tip prijenosa',
    value: null,
    color:theme.colors.lightgrey  
  };

  const placeholder_type = {
    label: 'Tip vozila',
    value: null,
    color:theme.colors.lightgrey  
  };

const AddBasicInfoScreen = props => {
    
  const [selectedItems, setSelectedItems] = useState();

  const _onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
      
    <View style={styles.container}>
     
      <ScrollView style={styles.scrollviewcontainer}>

        <BackButton goBack={() => props.navigation.goBack()} />
        <ExitButton goBack={() => props.navigation.navigate('Add')} />

        <View style={styles.contentstyle}>
          <Text style={styles.headerstyle}>Osnovne informacije</Text>
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
                }
              }}
            />

            <Divider style={styles.divider} />
            
            <RNPickerSelect
              placeholder={placeholder_drive}
              onValueChange={(value) => console.log(value)}
              items={drive}
              style={{
                placeholder: {
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
                }
              }}
            />

            <Divider style={styles.divider} />
            
            <Input
              id="snagamotora"
              label="Snaga motora"
              returnKeyType="next"
              style={styles.input}
            />

            <Divider style={styles.divider} />  
              
            <RNPickerSelect
              placeholder={placeholder_model}
              onValueChange={(value) => console.log(value)}
              items={sub_data}
              style={{
                placeholder: {
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
                }
              }}
            />

            <Divider style={styles.divider} />

            <RNPickerSelect
              placeholder={placeholder_transmission}
              onValueChange={(value) => console.log(value)}
              items={transmission}
              style={{
                placeholder: {
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
                }
              }}
            />
            
            <Divider style={styles.divider} />

            <RNPickerSelect
              placeholder={placeholder_type}
              onValueChange={(value) => console.log(value)}
              items={type}
              style={{
                placeholder: {
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
                }
              }}
            />

            <Divider style={styles.divider} />

            <SectionedMultiSelect
              items={items}
              hideSearch={true}
              showDropDowns={false}
              expandDropDowns={true}
              uniqueKey="id"
              subKey="children"
              iconKey="icon"
              selectText="Dodatna oprema"
              confirmText="Dodaj"
              selectedText = ""
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={_onSelectedItemsChange}
              selectedItems={selectedItems}
              styles={{button:{
              backgroundColor:theme.colors.primary,
              height:60
              },
              item:{
                  marginVertical:10,
              },
              itemText:{
                  fontSize:30
              },
              subItemText:{
                  fontSize:18
              },
              subItem:{
                  paddingVertical:9,
                  borderBottomWidth:1,
                  borderBottomColor:theme.colors.lightgrey
              },
              selectToggleText:{
                  color:theme.colors.primary
              }
            }}
            />
            <Divider style={styles.divider} />

          </View>
        </View>
      </ScrollView>

      <NextScreenButton navigate={() => props.navigation.navigate('')} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  scrollviewcontainer:{
    flex:1,
  },
  contentstyle:{
    marginTop:80,
    width:"80%",
    alignSelf:"center"
  },
  headerstyle: {
    fontSize: 32,
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
    width:"100%",
    marginBottom:10
  },
  rnpstyle:{
    marginTop:20
  },
  divider:{
    backgroundColor: 'black',
    marginVertical:5
  }
});

export default AddBasicInfoScreen;