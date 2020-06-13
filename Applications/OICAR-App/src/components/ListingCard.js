import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from "react-native";
import StarRating from 'react-native-star-rating'
import { theme } from "../utils/theme";

const ListingCard = props => {

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                width: props.width,
                height: props.height, 
                borderWidth: 0.8,
                borderRadius:10,
                backgroundColor:theme.colors.white,
                overflow:"hidden",
                borderColor: theme.colors.quaternary, 
                paddingBottom:5,
                marginBottom:20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                marginHorizontal:props.marginHorizontal
            }}>

            <View style={{  width: "100%",
                            height: props.imageHeight}}>
                <Image
                    style={styles.imagestyle}
                    source={{ uri: props.imageUri}} />
            </View>
            <View style={styles.description_container}>
                <Text style={styles.texttype}>{props.type}</Text>
                <Text style={styles.textname}>{props.name}</Text>
                <View style={styles.brandmodel}>
                    <View style={{  alignSelf:"flex-start",
                                    justifyContent:"flex-start",
                                    width:props.widthbrand}}>

                        <Text style={styles.textbrand}>{props.brand}</Text>
                        <Text style = {styles.textbrand}>{props.model}</Text>
                    </View>
                    <View style={{  alignItems:"flex-end",
                                    width:props.widthprice,
                                    marginLeft:-7}}>

                    <Text style={styles.textprice}>{props.price}kn / {props.pricetime}</Text>
                    <StarRating
                        disable={true}
                        maxStars={5}
                        rating={props.rating}
                        starSize={10}
                        fullStarColor={theme.colors.gold}
                    />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({

    description_container:{
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop:2
    },
    imagestyle:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    brandmodel:{
        flexDirection:"row",
        width:"100%",
        paddingTop:7,
        alignItems:"center"
    },
    texttype:{
        fontSize: 11,
        fontWeight:"bold",
        color: theme.colors.primary,
        paddingBottom:5,
    },
    textname:{
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom:2,
    },
    textprice:{
        fontSize: 10,
        paddingBottom:2,
        alignSelf:"flex-end"
    },
    textbrand:{
        fontSize: 12,
        fontWeight:"700"
    }
});

export default ListingCard;