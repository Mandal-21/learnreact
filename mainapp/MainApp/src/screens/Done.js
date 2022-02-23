import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setTaskID } from '../redux/actions';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';

export default function Done({ navigation }) {

  const { tasks } = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();
  // console.log(tasks, taskID);


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
              })
              .catch(err => console.log(err));
      }
  }

  return (

      <View style={styles.body}>
          <FlatList
              data={tasks.filter(task => task.Done == true)}
              renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                          dispatch(setTaskID(item.ID));
                          navigation.navigate('Task');
                      }}
                  >
                      <View style={styles.item_row}>
                          <CheckBox
                              value={item.Done}
                              onValueChange={(newValue) => {checkTask(item.ID, newValue)}}
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
      </View>
  )
}

const styles = StyleSheet.create({
  body: {
      flex: 1,
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

})