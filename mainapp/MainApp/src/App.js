import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// NAVIGATION
const Stack = createStackNavigator();

function ScreenA({navigation}) {

  const onPressHandler = () => {
    navigation.navigate('Screen_B')
    // navigation.replace('Screen_B');
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen A</Text>
      <Pressable
      onPress={onPressHandler}
      style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}
      >
        <Text style={styles.text}>Go to Screen B</Text>
      </Pressable>
    </View>
  )
}

function ScreenB({navigation}) {

  const onPressHandler = () => {
    // navigation.navigate('Screen_A')
    navigation.goBack();
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen B</Text>
      <Pressable
      onPress={onPressHandler}
      style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#ff0'})}
      >
        <Text style={styles.text}>Go to Screen A</Text>
      </Pressable>
    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // screenOptions={{
      //   header: () => null
      // }}
      >
        <Stack.Screen
        options={({navigation}) => ({
          header: () => null
        })}
          name="Screen_A"
          component={ScreenA} />
        <Stack.Screen
          name="Screen_B"
          component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  }
});

export default App;