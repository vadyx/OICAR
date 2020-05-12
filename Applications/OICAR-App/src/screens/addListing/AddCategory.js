import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons, Ionicons, Fontisto } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import CategoryAdd from '../../components/CategoryAdd';
import { theme } from '../../utils/theme';
import * as categoriesActions from '../../store/actions/category';
import ExitButton from '../../components/ExitButton';

const _renderCategoryItem = (item) => {
  return (
    <CategoryAdd
      key={item.id} 
      name={item.name}
    />
  );
}


const AddCategory = props => {

  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  if (categories.length === 0) {
    try {
      dispatch(categoriesActions.loadCategories());
    } catch (error) {
      
    }
  }

 
  return (
    <View style={styles.container}>
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <Text style={styles.headerstyle}>Odaberite kategoriju</Text>
      <View style={{marginTop:30}}>
      {categories.map(item => _renderCategoryItem(item))}
      </View>
     
      
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('AddName')}>
        <MaterialIcons name="navigate-next" size={50} color={theme.colors.white} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 32,
    marginTop:70,
    fontWeight: '700',
},
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    position:"absolute",    
    bottom: 0,
    right: 0,
    margin:20,
    width: 48,
    height: 48,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  iconstyle:{
    paddingLeft:20,
    fontSize:28
  }
});

export default AddCategory;