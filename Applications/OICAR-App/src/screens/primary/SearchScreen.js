import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as vehicleDataActions from '../../store/actions/vehicleData';
import * as newListingActions from '../../store/actions/newListing';
import CategoryAdd from '../../components/CategoryAdd'
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';

const SearchContainer = props => {

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

  const _onNextPressed = async () => {
    dispatch(newListingActions.setCategory(selectedCategory));
    await dispatch(vehicleDataActions.loadManufacturers(selectedCategory));
    props.navigation.navigate('Filter');
  }

  const _renderCategoryItem = (item) => {

    return (
      <CategoryAdd
      style={styles.category}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerrow}>
          <Image source={require('../../assets/car_search_icon.png')} style={styles.iconstyle} />
          <Text style={styles.headerstyle}>Pretraživanje vozila</Text>
        </View>
        <Text style={styles.paragraphstyle}>Odaberite kategoriju vozla koje vas zanima! </Text>
        {categories.map(item => _renderCategoryItem(item))}
        <View style={styles.bottomview}/>
      </ScrollView>
      <NextScreenButton navigate={_onNextPressed} disabled={selectedCategory === undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  
  iconstyle:{
    alignSelf:"center",
    width:140,
    height:140
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:"center",
    backgroundColor: theme.colors.white,
    marginTop:getStatusBarHeight(),
  },
  headerrow:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:30
  },
  headerstyle: {
      fontSize: 30,
      fontWeight: '700',
      width:185,
      marginLeft: 10,
      marginTop:10,
      marginBottom:5
  },
  paragraphstyle:{
      marginTop:10,
      fontSize: 17,
      textAlign:"left",
      marginLeft:20,
      width:"90%",
      fontWeight: '300',
      marginBottom:20,
  },
  bottomview:{
    height:40
  },
  category:{
    alignItems:"flex-start",
    marginLeft:20
  }
});

export default SearchContainer;