import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; 
import { theme } from '../utils/theme';

const CategoryAdd = props => {

  let buttonStyle = styles.tostyle;
  let textStyle = styles.txtstyle;
  if (props.selected) {
    buttonStyle = {...buttonStyle, ...{backgroundColor: theme.colors.primary}};
    textStyle = {...textStyle, ...{color: theme.colors.white}}
  }
 
  return (
    <View style={{...styles.container1,...props.style}}>
      <View style={styles.category1}>
        <TouchableOpacity style={buttonStyle} onPress={() => props.onSelected(props.catID)}>
          <Text style={textStyle}>{props.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems:"center",
    marginTop:15,
  },
  category1:{
      width:220,
  },
  tostyle:{
    borderRadius:5,
    shadowColor: "#000",
    borderWidth:0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    height:50,
    alignItems:"center",
    backgroundColor:theme.colors.white
  },
  txtstyle:{
    marginVertical:10,
    fontSize:22,
    fontWeight:"900",
    color:theme.colors.primary
  }
});

export default CategoryAdd;