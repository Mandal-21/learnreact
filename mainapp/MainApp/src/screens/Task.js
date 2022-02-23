import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    Image,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from '../utils/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setTaskID } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from "react-native-push-notification"

export default function Task({ navigation }) {

    const { tasks, taskID } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [done, setDone] = useState(false);
    const [showBellModel, setShowBellModel] = useState(false);
    const [color, setColor] = useState('white');
    const [bellTime, setBellTime] = useState('1');
    const [image, setImage] = useState('');


    useEffect(() => {
        navigation.addListener('focus', () => {
            getTask();
        });
    }, []);


    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID);
        if (Task) {
            setTitle(Task.Title);
            setDesc(Task.Desc);
            setDone(Task.Done);
            setColor(Task.Color);
            setImage(Task.Image);
        }
    }


    const setTask = () => {
        if (title.length == 0) {
            Alert.alert('Warning!', 'Please enter title');
        } else {
            try {
                var Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color,
                    Image: image,
                }

                const index = tasks.findIndex(task => task.ID === taskID);
                let newTasks = [];
                if (index > -1) {
                    newTasks = [...tasks];
                    newTasks[index] = Task;
                } else {
                    newTasks = [...tasks, Task];
                }

                AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                    .then(() => {
                        dispatch(setTasks(newTasks))
                        Alert.alert('Success!', 'Task added');
                        navigation.navigate('To-Do');
                    })
                    .catch(err => console.log(err));

            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteImage = () => {
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
            newTasks = [...tasks];
            newTasks[index].Image = '';
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks));
                    getTask();
                    Alert.alert("Sucess!", "Task image is deleted!");
                })
                .catch(err => console.log(err));
        }
    }

    const setTaskAlarm = () => {

        PushNotification.localNotificationSchedule({
            channelId: 'task-channel',
            title: title,
            message: desc,
            date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
            allowWhileIdle: true,
        });
    }

    return (
        <ScrollView>
            <View style={styles.body}>
                <Modal
                    visible={showBellModel}
                    transparent
                    onCloseRequest={() => { setShowBellModel(false) }}
                    animationType="slide"
                    hardwareAccelerated
                >
                    <View style={styles.centered_view}>
                        <View style={styles.bell_model}>
                            <View style={styles.bell_body}>
                                <Text style={styles.text}>Remind me after</Text>
                                <TextInput
                                    style={styles.bell_input}
                                    keyboardType="numeric"
                                    value={bellTime}
                                    onChangeText={(value) => { setBellTime(value) }}
                                />
                                <Text style={styles.text}>minute(s)</Text>
                            </View>
                            <View style={styles.bell_buttons}>
                                <TouchableOpacity
                                    style={styles.bell_cancel_button}
                                    onPress={() => {
                                        setShowBellModel(false)
                                    }}
                                >
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bell_ok_button}
                                    onPress={() => {
                                        setShowBellModel(false)
                                        setTaskAlarm()
                                    }}
                                >
                                    <Text style={styles.text}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TextInput
                    value={title}
                    style={styles.input}
                    placeholder="Title"
                    onChangeText={(value) => setTitle(value)}
                />
                <TextInput
                    value={desc}
                    style={styles.input}
                    placeholder="Description"
                    multiline={true}
                    onChangeText={(value) => setDesc(value)}
                />
                <View style={styles.color_bar}>
                    <TouchableOpacity
                        style={styles.color_white}
                        onPress={() => setColor('white')}
                    >
                        {
                            color === 'white' &&
                            <FontAwesome5
                                name="check"
                                size={25}
                                color={"#000000"}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color_red}
                        onPress={() => setColor('red')}
                    >
                        {
                            color === 'red' &&
                            <FontAwesome5
                                name="check"
                                size={25}
                                color={"#000000"}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color_blue}
                        onPress={() => setColor('blue')}
                    >
                        {
                            color === 'blue' &&
                            <FontAwesome5
                                name="check"
                                size={25}
                                color={"#000000"}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.color_green}
                        onPress={() => setColor('green')}
                    >
                        {
                            color === 'green' &&
                            <FontAwesome5
                                name="check"
                                size={25}
                                color={"#000000"}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.extra_row}>
                    <TouchableOpacity
                        style={styles.extra_button}
                        onPress={() => setShowBellModel(true)}
                    >
                        <FontAwesome5
                            name="bell"
                            size={25}
                            color={"#ffffff"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.extra_button}
                        onPress={() => { navigation.navigate('Camera', { id: taskID }) }}
                    >
                        <FontAwesome5
                            name="camera"
                            size={25}
                            color={"#ffffff"}
                        />
                    </TouchableOpacity>
                </View>
                {
                    image ?
                        <View>
                            <Image
                                style={styles.image}
                                source={{ uri: image }}
                            />
                            <TouchableOpacity
                                style={styles.delete}
                                onPress={() => deleteImage()}
                            >
                                <FontAwesome5
                                    name="trash"
                                    size={25}
                                    color={'#ff3636'}
                                />
                            </TouchableOpacity>

                        </View>
                        :
                        null
                }
                <View style={styles.checkbox}>
                    <CheckBox
                        value={done}
                        onValueChange={(newValue) => setDone(newValue)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.text}>Is Done</Text>
                </View>
                <CustomButton
                    title="Save"
                    color="#00f00e"
                    style={{ width: "100%" }}
                    onPressFunction={setTask}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    checkbox: {
        flexDirection: 'row',
        margin: 2,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#0080ff',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: '#000000',
    },
    color_bar: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#555555',
        marginVertical: 10,
    },
    color_white: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    color_red: {
        flex: 1,
        backgroundColor: '#f28282',
        alignItems: 'center',
        justifyContent: 'center',
    },
    color_blue: {
        flex: 1,
        backgroundColor: '#aebcfa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    color_green: {
        flex: 1,
        backgroundColor: '#ccff90',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    extra_row: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    extra_button: {
        flex: 1,
        height: 50,
        backgroundColor: '#0080ff',
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered_view: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: "center",
        alignItems: "center",
    },
    bell_model: {
        width: 300,
        height: 200,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#000000"
    },
    bell_body: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_buttons: {
        flexDirection: 'row',
        height: 50,
    },
    bell_input: {
        width: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#555555',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
    },
    bell_cancel_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderBottomLeftRadius: 20,
        backgroundColor: '#ff3636',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bell_ok_button: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderBottomRightRadius: 20,
        backgroundColor: '#00f00e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        margin: 20,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#ffffff80',
        margin: 10,
        borderRadius: 5,
    },
}) 