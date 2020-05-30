import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import StarRating from 'react-native-star-rating'
import { theme } from "../utils/theme";

const FeaturedVehicle = props => {

    return (
        <View style={{  width: props.width / 2 - 28, 
                        height: props.height / 2 - 130, 
                        borderWidth: 0.8,
                        borderRadius:10,
                        backgroundColor:theme.colors.white,
                        overflow:"hidden",
                        borderColor: theme.colors.quaternary, 
                        paddingBottom:5,
                        marginBottom:10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,
                        elevation: 10,
                        }}>

            <View style={{width: "100%", height: props.imageHeight}}>
                <Image
                    style={styles.imagestyle}
                    source={props.imageUri} />
            </View>
            <View style={styles.description_container}>
                <Text style={styles.texttype}>{props.type}</Text>
                <Text style={styles.textname}>{props.name}</Text>
                <Text style={styles.textprice}>{props.price}$</Text>
                <StarRating
                    disable={true}
                    maxStars={5}
                    rating={props.rating}
                    starSize={10}
                    fullStarColor={theme.colors.gold}
                />
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({

    description_container:{
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingLeft: 10,
        paddingTop:2
    },
    imagestyle:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
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
        paddingBottom:2
    },
    textprice:{
        fontSize: 10
    }
});

export default FeaturedVehicle;