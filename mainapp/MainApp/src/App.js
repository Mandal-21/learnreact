import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenA from './ScreenA';
import ScreenB from './screenB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// NAVIGATION
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {

            let iconName;
            size = focused ? 25 : 20;
            // color = focused ? '#f0f' : '#ddd';

            if (route.name === 'Screen_A') {
              iconName = 'autoprefixer';

            } else if (route.name === 'Screen_B') {
              iconName = 'btc';

            } return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
          tabBarStyle: { backgroundColor: '#694fad' },
          tabBarActiveTintColor: '#f0f',
          tabBarInactiveTintColor: '#555',
          tabBarInactiveBackgroundColor: '#999',
          showlabel: false,
        })}
        activeColor='#f0def0'
        inactiveColor='#3e2465'
        barStyle={{ backgroundColor: '#694fad' }}

      >
        <Tab.Screen
          name="Screen_A"
          component={ScreenA}
        />
        <Tab.Screen
          name="Screen_B"
          component={ScreenB} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}



export default App;