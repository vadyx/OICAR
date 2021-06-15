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
                borderRadius: 10,
                backgroundColor: theme.colors.white,
                overflow: "hidden",
                borderColor: theme.colors.quaternary,
                paddingBottom: 5,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                marginHorizontal: props.marginHorizontal
            }}>

            <View style={{ resizeMode: "cover", flex: 1 }}>
                <Image
                    style={styles.imagestyle}
                    source={{ uri: props.imageUri }} />
            </View>
            <View style={styles.description_container}>

                {props.type !== undefined && <Text style={[styles.texttype, { fontSize: props.fontTextSize - 2 }]}>{props.type}</Text>}
                <Text style={[styles.textname, { fontSize: props.fontTextSize }]}>{props.name}</Text>
                <View style={[styles.brandmodel, { paddingTop: props.fontTextSize }]}>
                    <View style={{ width: "50%" }}>
                        <Text style={[styles.textbrand, { fontSize: props.fontTextSize }]}>{props.brand}</Text>
                        <Text style={[styles.textbrand, { fontSize: props.fontTextSize }]}>{props.model}</Text>
                    </View>
                    <View style={{ width: "50%" }}>
                        <Text style={[styles.textprice, { fontSize: props.fontTextSize }]}>{props.price}kn / {props.pricetime}</Text>
                        <View style={{ width: 70, alignSelf: "flex-end" }}>
                            <StarRating
                                disable={true}
                                maxStars={5}
                                rating={props.rating}
                                starSize={props.fontTextSize}
                                fullStarColor={theme.colors.gold}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );

}

const styles = StyleSheet.create({

    description_container: {
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 4
    },
    imagestyle: {
        flex: 1,
        resizeMode: "cover"
    },
    brandmodel: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    texttype: {
        color: theme.colors.primary,
        paddingBottom: 4,
    },
    textname: {
        fontWeight: '700',
        color: theme.colors.darkgray
    },
    textprice: {
        paddingBottom: 4,
        fontWeight: "700",
        color: theme.colors.darkgray,
        textAlign: "right"
    },
    textbrand: {
        fontWeight: "500",
        color: theme.colors.gray
    }
});

export default ListingCard;