import React, { useState, useEffect, useCallback } from 'react';
import { 
    StyleSheet, 
    View, 
    FlatList, 
    SafeAreaView,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ListingCard from '../../components/ListingCard';
import * as reservationActions from '../../store/actions/reservation';
import { theme } from '../../utils/theme';

const width = Math.round(Dimensions.get('window').width) -50;
const height = 235;
const imgsize = 140;
const descbrandsize = "70%";
const descpricesize = "30%";


const ReservedRenterListingScreen = props => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const listings = useSelector(state => state.reservation.givenReservations);
    const dispatch = useDispatch();

    const _loadListings = useCallback(async () => {
        await dispatch(reservationActions.loadGivenReservations());
    }, [dispatch, setIsRefreshing]);

    const _onReservationPressed = async (id) => {
        await dispatch(reservationActions.loadSelectedReservation(id, 2));
        props.navigation.navigate('ReservedRenter');
    }

    const _renderListing = itemData => {
        return (
            <ListingCard
                imageUri={`data:image/jpg;base64,${itemData.item.listing.image}`}
                name={itemData.item.listing.title}
                type="Auto"
                price={itemData.item.listing.price}
                pricetime={itemData.item.listing.pricePeriod}
                rating={itemData.item.listing.rating}
                brand = {itemData.item.listing.manufacturer}
                model={itemData.item.listing.model}
                onPress={() => _onReservationPressed(itemData.item.reservationID)}
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
                    keyExtractor={item => item.listing.id.toString()}
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