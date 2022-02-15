import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Login from './screens/Login';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

// NAVIGATION
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();



function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"


        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}

          />
          <Stack.Screen
            name="Home"
            component={Home}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}



export default App;