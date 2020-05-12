import React,{memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; 
import { theme } from '../utils/theme';

const CategoryAdd = ({children,...props}) => {
 
  return (
      <View style={styles.container1}>
        <View style={styles.category1}>
          <TouchableOpacity style={styles.tostyle} onPress={props.goNext}>
              {children}
            <Text style={styles.txtstyle}>{props.name}</Text>
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    height:50,
    alignItems:"center"
},
txtstyle:{
    marginVertical:10,
    fontSize:22,
    fontWeight:"900",
    color:theme.colors.primary
}
});

export default memo(CategoryAdd);