import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import StarRating from 'react-native-star-rating'
import { theme } from "../utils/theme";
class Home extends Component {
    render() {
        return (
            <View style={{  width: this.props.width / 2 - 30, 
                            height: this.props.width / 2 - 20, 
                            borderWidth: 0.5,
                            borderRadius:0,
                            overflow:"hidden",
                            borderColor: theme.colors.white, 
                            paddingBottom:5,
                            marginBottom:8}}>

                <View style={styles.container}>
                    <Image
                        style={styles.imagestyle}
                        source={this.props.imageUri} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.textstyle1}>{this.props.type}</Text>
                    <Text style={styles.textstyle2}>{this.props.name}</Text>
                    <Text style={styles.textstyle3}>{this.props.price}$</Text>
                    <StarRating
                        disable={true}
                        maxStars={5}
                        rating={this.props.rating}
                        starSize={10}

                    />
                </View>
            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({

    container:{
        flex: 2,
        borderWidth:0.5,
        borderRadius:10,
        overflow:"hidden" 
    },
    container2:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingLeft: 10
    },
    imagestyle:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    textstyle1:{
        fontSize: 10,
        color: theme.colors.primary
    },
    textstyle2:{
        fontSize: 12,
        fontWeight: 'bold'
    },
    textstyle3:{
        fontSize: 10
    }
});