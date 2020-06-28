import React, { useState, useEffect, useCallback } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    SafeAreaView,
    Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';

import BackButton from '../../components/BackButton';
import ListingCard from '../../components/ListingCard';
import * as profileActions from '../../store/actions/profile';
import * as listingsActions from '../../store/actions/listings';
import { theme } from '../../utils/theme';

const width = Math.round(Dimensions.get('window').width) -50;
const height = 235;
const imgsize = 140;
const descbrandsize = "70%";
const descpricesize = "30%";


const ReservedRenterListingScreen = props => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const listings = useSelector(state => state.profile.listings);
    const dispatch = useDispatch();

    const _loadListings = useCallback(async () => {
        await dispatch(profileActions.loadUserListings());
    }, [dispatch, setIsRefreshing]);

    const _onListingPressed = async (id) => {
        await dispatch(listingsActions.loadSelectedListing(id));
        props.navigation.navigate('ReservedRenter');
    }

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

    useEffect(() => {
        setIsRefreshing(true);
        _loadListings().then(() => {
            setIsRefreshing(false);
        });
    }, [dispatch, _loadListings]);

    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.container}>
                <FlatList
                    data={listings} 
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.headerstyle}/>
                    }
                    onRefresh={_loadListings}
                    refreshing={isRefreshing}
                    renderItem={itemData => _renderListing(itemData)}
                    style={styles.flstyle}
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
        overflow:"hidden",
    },
    headerstyle:{
        height:40,
        marginBottom:10,
        width:"100%",
        justifyContent:"center",
        backgroundColor:theme.colors.white
    },
    flstyle:{
        width:"100%",
    }
});

export default ReservedRenterListingScreen;