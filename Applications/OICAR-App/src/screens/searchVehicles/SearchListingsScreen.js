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

import BackButton from '../../components/BackButton';
import ListingCard from '../../components/ListingCard';
import * as listingsActions from '../../store/actions/listings';
import { theme } from '../../utils/theme';

const width = Math.round(Dimensions.get('window').width) -50;
const height = 230;
const imgsize = 140;
const descbrandsize = "80%";
const descpricesize = "20%";

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
            width={width}
            height={height}
            imageHeight={imgsize}
            widthbrand={descbrandsize}
            widthprice={descpricesize}
        />
    );
};

const _renderListHeader = () => {
    return (
        <View style={styles.sortfilter}>
            <TouchableOpacity style={styles.tosort}><Text style={styles.totext}>Sortiraj</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tofilter}><Text style={styles.totext}>Filtriraj</Text></TouchableOpacity>
        </View>
    );
};

const SearchListingsScreen = props => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const listings = useSelector(state => state.listings);
    const dispatch = useDispatch();

    const _loadListings = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(listingsActions.loadCategoryListings());
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing]);

    const _loadMoreListings = useCallback(async () => {
        setIsLoadingMore(true);
        await dispatch(listingsActions.load10MoreListings());
        setIsLoadingMore(false);
    });

    const _renderListFooter = () => {
        if (isLoadingMore && listings.listings.length > 0) {
            return (
                // loader component
                <View></View>
            );
        } else if (listings.listings.length === 0) {
            return (
                // button
                <View></View>
            );
        }

        return null;
    };

    useEffect(() => {
        _loadListings();
    }, [dispatch, _loadListings]);

    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.container}>
                <View style={styles.headerstyle}>
                    <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
                    <Text style={styles.headertext}>Automobili</Text>
                </View>
                <FlatList
                    data={listings.shownListings} 
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={_renderListHeader}
                    ListFooterComponent={_renderListFooter}
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
        marginTop:25,
        alignSelf:"center",
        flexDirection:"row",
        height:40,
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
    }
});

export default SearchListingsScreen;