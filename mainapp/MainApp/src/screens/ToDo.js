import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Alert
} from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setTaskID } from '../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import CheckBox from '@react-native-community/checkbox';

export default function ToDo({ navigation }) {

    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();
    // console.log(tasks, taskID);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        AsyncStorage.getItem('Tasks')
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                if (parsedTasks && typeof parsedTasks == 'object') {
                    dispatch(setTasks(parsedTasks));
                }
            })
            .catch(err => console.log(err));
    }

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.ID != id);
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks));
            })
            .catch(err => console.log(err));
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.ID === id);
        let newTasks = [];
        if (index > -1) {
            newTasks = [...tasks];
            newTasks[index].Done = newValue;
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks));
                    Alert.alert("Sucess!", "Task status changed!");
                })
                .catch(err => console.log(err));
        }
    }

    return (

        <View style={styles.body}>
            <FlatList
                data={tasks.filter(task => task.Done == false)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTaskID(item.ID));
                            navigation.navigate('Task');
                        }}
                    >
                        <View style={styles.item_row}>
                            <View
                                style={[
                                    {
                                        backgroundColor:
                                            item.Color === 'red' ? '#f28b82' :
                                                item.Colo === 'green' ? '#a5d6a7' :
                                                    item.Color === 'blue' ? '#90caf9' : '#ffffff'
                                    },
                                    styles.color
                                ]}

                            />
                            <CheckBox
                                value={item.Done}
                                onValueChange={(newValue) => { checkTask(item.ID, newValue) }}
                            />
                            <View style={styles.item_body}>
                                <Text
                                    style={[
                                        GlobalStyle.CustomFontHW,
                                        styles.title
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Title}
                                </Text>
                                <Text
                                    style={styles.subtitle}
                                    numberOfLines={1}
                                >
                                    {item.Desc}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.delete}
                                onPress={() => {
                                    deleteTask(item.ID);
                                }}
                            >
                                <FontAwesome5
                                    name="trash"
                                    size={25}
                                    color={"#ff3636"}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item, key) => key.toString()}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity

                style={styles.button}
                onPress={() => {
                    dispatch(setTaskID(tasks.length + 1));
                    navigation.navigate('Task')
                }}
            >
                <FontAwesome5
                    name={"plus"}
                    color={"#ffffff"}
                    size={20}
                />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    button: {
        backgroundColor: '#0080ff',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,

    },

    item_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_body: {
        flex: 1,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 15,
    },
    color: {
        width: 20,
        height: 50,
        borderRadius: 5,
    }

})