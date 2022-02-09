import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const Header = (props) => {

    return (
        <View style={styles.view}>
            <Text style={styles.text}>React Native Tutorial</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        backgroundColor: '#00f',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',

    }
});

export default Header;