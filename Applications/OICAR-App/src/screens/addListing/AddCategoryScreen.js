import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native'; 
import { useSelector, useDispatch } from 'react-redux';

import * as vehicleDataActions from '../../store/actions/vehicleData';
import CategoryAdd from '../../components/CategoryAdd';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';

const AddCategoryScreen = props => {

  const [selectedCategory, setSelectedCategory] = useState();

  const categories = useSelector(state => state.vehicleData.categories);
  const dispatch = useDispatch();

  if (categories.length === 0) {
    try {
      dispatch(vehicleDataActions.loadCategories());
    } catch (error) {
      // error handling
    }
  }

  const _onSelectedCategory = (categoryID) => {
    setSelectedCategory(categoryID);
  };

  const _renderCategoryItem = (item) => {

    return (
      <CategoryAdd
        key={item.id}
        catID={item.id}
        name={item.name}
        selected={item.id === selectedCategory}
        onSelected={_onSelectedCategory}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <Text style={styles.headerstyle}>Kategorija vozila</Text>
      <View style={{marginTop:30}}>
        {categories.map(item => _renderCategoryItem(item))}
      </View>

      <NextScreenButton navigate={() => props.navigation.navigate('AddModel')} disabled={selectedCategory === undefined} />

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
    marginTop:80,
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