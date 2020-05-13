import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native'; 
import { useSelector, useDispatch } from 'react-redux';

import CategoryAdd from '../../components/CategoryAdd';
import * as categoriesActions from '../../store/actions/category';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';

const _renderCategoryItem = (item) => {
  return (
    <CategoryAdd
      key={item.id} 
      name={item.name}
    />
  );
}

const AddCategoryScreen = props => {

  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  if (categories.length === 0) {
    try {
      dispatch(categoriesActions.loadCategories());
    } catch (error) {
      // error handling
    }
  }

  return (
    <View style={styles.container}>
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <Text style={styles.headerstyle}>Odaberite kategoriju</Text>
      <View style={{marginTop:30}}>
        {categories.map(item => _renderCategoryItem(item))}
      </View>

      <NextScreenButton navigate={() => props.navigation.navigate('AddBrand')} />

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
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  iconstyle:{
    paddingLeft:20,
    fontSize:28
  }
});

export default AddCategoryScreen;