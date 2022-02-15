
import React, { useState, useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import SQLite from "react-native-sqlite-storage";
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAge, setIncrementAge, getCities } from '../redux/actions';
import PushNotification from "react-native-push-notification";

const db = SQLite.openDatabase(
    {
        name: "MainDB",
        location: "default",
    },
    () => { },
    error => {
        console.log("error", error);
    }
);

export default function Home({ navigation, route }) {

    const { name, age, cities } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');


    useEffect(() => {
        getData(),
            dispatch(getCities())
    }, [])

    const handleNotification = (item, index) => {

        PushNotification.cancelAllLocalNotifications();

        PushNotification.localNotification({
            channelId: "test-channel",
            title: "You clicked on " + item.country,
            message: item.city,
            bigText: item.city + " is the capital of " + item.country,
            color: "red",
            id: index,
        })

        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: "You clicked on " + item.country,
            message: item.city,
            bigText: "You clicked 20s ago on " + item.country,
            color: "red",
            id: index,
            date: new Date(Date.now() + 20 * 1000 ),
            allowWhileIdle: true,
        })
    }

    const getData = () => {
        try {
            // AsyncStorage.getItem('UserData')
            //     .then(value => {
            //         if (value != null) {
            //             let user = JSON.parse(value);
            //             setName(user.Name);
            //             setAge(user.Age);
            //         }
            //     })
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).Name;
                            var userAge = results.rows.item(0).Age;
                            dispatch(setName(userName));
                            dispatch(setAge(userAge));
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning', 'Please enter your name')
        } else {
            try {
                // var user = {
                //     Name: name,
                // }
                // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                // Alert.alert('Success', 'Your name has been saved')
                db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name = ?",
                        [name],
                        () => { Alert.alert('Success', 'Your name has been saved') }
                    )
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            // await AsyncStorage.removeItem('UserName');
            // await AsyncStorage.clear();
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM Users;",
                    [],
                    () => { navigation.navigate('Login') }
                )
            })

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
            {/* <Text style={[
                GlobalStyle.CustomFont,
                styles.text]}
            >
                Your Age is {age} years
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value) => dispatch(setName(value))}
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
            <CustomButton
                title='AgeIncrement'
                color='#f0f'
                onPressFunction={() => dispatch(setIncrementAge())}
            /> */}

            <FlatList
                data={cities}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                    onPress = {() => handleNotification(item, index)}
                    >
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.country}</Text>
                            <Text style={styles.subtitle}>{item.city}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
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
    },
    item: {
        backgroundColor: '#f9c2ff',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#cccccc',
        margin: 7,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 30,
        margin: 10,
    },
    subtitle: {
        fontSize: 20,
        margin: 10,
        color: '#999999'
    }
});