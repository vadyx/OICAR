import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../utils/theme";

const EmptyList = ({ headerText, subHeaderText, icon }) => {
    return (
        <View style={styles.container}>
            {icon}
            <View style={styles.textContainer}>
                <Text style={styles.header}>{headerText}</Text>
                <Text style={styles.subHeader}>{subHeaderText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.darkgray,
        textAlign: "center",
        paddingBottom: 8
    },
    subHeader: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.lightgrey,
        textAlign: "center"
    },
    textContainer: {
        width:"80%",
        paddingVertical: 32
    }
})

export default EmptyList;