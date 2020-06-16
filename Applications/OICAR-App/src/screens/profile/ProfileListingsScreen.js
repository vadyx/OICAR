import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProfileListingsScreen = props => {
    return (
        <View style={styles.container}>
            <Text>Moji oglasi</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ProfileListingsScreen;