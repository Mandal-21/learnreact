import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ToDo from './screens/ToDo';
import Splash from './screens/Splash';
import Done from './screens/Done';
import Task from './screens/Task';
import Camera from './screens/Camera';

import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';


const Tab = createBottomTabNavigator();

function HomeTabs() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'To-Do') {
            iconName = "clipboard-list";
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = "clipboard-check";
            size = focused ? 25 : 20;
          }
          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={color}
            />
          )
        }
      })
      }
      tabBarOptions={{
        activeTintColor: '#0080ff',
        inactiveTintColor: '#777777',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="To-Do"
        component={ToDo}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Done"
        component={Done}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )

}


const RootStack = createStackNavigator();


function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              color: '#ffffff',
            },
            headerStyle: {
              backgroundColor: '#0080ff',
            }
          }}
        >
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
              headerLeft: null,
            }}
          />
          <RootStack.Screen
            name="My Task"
            component={HomeTabs}
            options={{
              headerLeft: null,
            }}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
          />
          <RootStack.Screen
            name="Camera"
            component={Camera}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;