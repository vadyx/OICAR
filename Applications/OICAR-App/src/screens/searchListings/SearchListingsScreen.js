import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';
import * as Permissions from 'expo-permissions';

import BackButton from '../../components/BackButton';
import ListingCard from '../../components/ListingCard';
import * as listingsActions from '../../store/actions/listings';
import { theme } from '../../utils/theme';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';

const width = Math.round(Dimensions.get('window').width) -50;
const height = 235;
const imgsize = 140;
const descbrandsize = "70%";
const descpricesize = "30%";



const SearchListingsScreen = props => {
    
    const listings = useSelector(state => state.listings);
    const categories = useSelector(state => state.vehicleData.categories);

    const [selectedCategory, setSelectedCategory] = useState(listings.category);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const dispatch = useDispatch();

    const _onListingPressed = async (id) => {
        await dispatch(listingsActions.loadSelectedListing(id));
        props.navigation.navigate('ListingDetails');
    }

    const _verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        return result.status === "granted";
    };
    
    const _onFilterPress = () => {
        props.navigation.navigate('Filter')
    }

    const _loadListings = useCallback(async () => {
        setIsRefreshing(true);
        const hasPermission = await _verifyPermissions();
        await dispatch(listingsActions.loadCategoryListings(hasPermission));
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing]);

    const _loadMoreListings = async () => {
        await dispatch(listingsActions.load10MoreListings());
    };

    const _renderListing = itemData => {
        return (
            <ListingCard
                imageUri={`data:image/jpg;base64,${itemData.item.image}`}
                name={itemData.item.title}
                type="Auto"
                price={itemData.item.price}
                pricetime={itemData.item.pricePeriod}
                rating={itemData.item.rating}
                brand = {itemData.item.manufacturer}
                model={itemData.item.model}
                onPress={() => _onListingPressed(itemData.item.id)}
                width={width}
                height={height}
                imageHeight={imgsize}
                widthbrand={descbrandsize}
                widthprice={descpricesize}
                marginHorizontal={20}
            />
        );
    };

    const _renderListHeader = () => {
        return (
            <View style={styles.sortfilter}>
                <TouchableOpacity style={styles.tosort}><Text style={styles.totext}>Sortiraj</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tofilter} onPress={() => _onFilterPress()}><Text style={styles.totext}>Filtriraj</Text></TouchableOpacity>
            </View>
        );
    };

    const _renderListFooter = () => {
        if (listings.listings.length === 0) {
            if (listings.isMore) {
                return (
                    <View style={styles.footerbuttoncontainer}>
                        <TouchableOpacity style={styles.footerbutton} >
                            <View style={styles.footerbuttoncontent}>
                                <Text style={styles.footerbuttontext}>Više oglasa</Text>
                                <AntDesign name="arrowdown" size={18} color={theme.colors.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return null;
            }
        }

        return (
            <View style={styles.footerloader}>
                <LottieView 
                    style={styles.lottiestyle}
                    loop={true}
                    autoPlay
                    source={require('../../assets/list_loader.json')}
                />
            </View>
        );
    };

    useEffect(() => {
        _loadListings();

        const category = categories.find(cat => cat.id === listings.categoryID);
        setSelectedCategory(category.name);
    }, [dispatch, _loadListings]);

    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.container}>
                <View style={styles.headerstyle}>
                    <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
                    <Text style={styles.headertext}>{selectedCategory}</Text>
                </View>
                <FlatList
                    data={listings.shownListings} 
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={_renderListHeader}
                    ListFooterComponent={_renderListFooter}
                    showsVerticalScrollIndicator={false}
                    onRefresh={_loadListings}
                    refreshing={isRefreshing}
                    renderItem={itemData => _renderListing(itemData)}
                    onEndReachedThreshold={0.5}
                    onEndReached={_loadMoreListings}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sav:{
        flex:1
    },
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:getStatusBarHeight(),
        overflow:"hidden",
    },
    headerstyle:{
        height:60,
        width:"100%",
        justifyContent:"center",
        backgroundColor:theme.colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backandexit:{
        top:null,
    },
    headertext:{
        color:theme.colors.primary,
        alignSelf:"center",
        fontWeight:"700",
        fontSize:20,
    },
    sortfilter:{
        marginTop:23,
        marginBottom:25,
        alignSelf:"center",
        flexDirection:"row",
        height:42,
        width:"80%",
        borderRadius:30,
        borderColor:theme.colors.lightplusgrey,
        borderWidth:1,
        elevation:3,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:theme.colors.white
    },
    tosort:{
        width:"50%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        borderRightWidth:1,
        borderColor:theme.colors.lightplusgrey
    },
    tofilter:{
        width:"50%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        borderLeftWidth:1,
        borderColor:theme.colors.lightplusgrey
    },
    totext:{
        fontSize:15,
        fontWeight:"600",
        color:theme.colors.darkgray
    },
    listads:{
        paddingHorizontal:18,
        marginTop: 20,
        paddingTop:20,
        flexDirection:'column'
    },
    lottiestyle:{
        width:50,
        height:50
    },
    footerbuttoncontainer:{
        alignItems:"center",
        marginBottom:10
    },
    footerloader:{
        alignItems:"center",
        marginBottom:10

    },
    footerbutton:{
        borderWidth:1,
        borderRadius:10,
        borderColor:theme.colors.primary,
        backgroundColor:theme.colors.primary
    },
    footerbuttoncontent:{
        margin:5,
        padding:5,
        alignItems:"center"
    },
    footerbuttontext:{
        color:theme.colors.white
    }
});

export default SearchListingsScreen;