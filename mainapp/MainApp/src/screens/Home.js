
import React, { useState, useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';

export default function Home({ navigation, route }) {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then((value) => {
                    if (value !== null) {
                        let user = JSON.parse(value);
                        setName(user.Name);
                        setAge(user.Age);
                    }
                });
        } catch (error) {
            console.log(error);
        }

    }

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning', 'Please enter your name')
        } else {
            try {
                var user = {
                    Name: name,
                }
                await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                Alert.alert('Success', 'Your name has been saved')
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            // await AsyncStorage.removeItem('UserName');
            await AsyncStorage.clear();
            navigation.navigate('Login')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.body}>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text]}
            >
                Welcome {name} !
            </Text>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text]}
            >
                Your Age is {age} years
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value) => setName(value)}
            />
            <CustomButton
                title='Update'
                color='#ff7f00'
                onPressFunction={updateData}
            />
            <CustomButton
                title='Remove'
                color='#f40'
                onPressFunction={removeData}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
    input: {
        width: 300,
        borderColor: "#555",
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        textAlign: "center",
        marginTop: 130,
        marginBottom: 20,
    }
});