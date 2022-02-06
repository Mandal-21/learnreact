import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  RefreshControl,
} from 'react-native';



const App = () => {

  const [items, setItems] = useState([
    { 'key': 1, 'item': 1 },
    { 'key': 2, 'item': 2 },
    { 'key': 3, 'item': 3 },
    { 'key': 4, 'item': 4 },
    { 'key': 5, 'item': 5 },
    { 'key': 6, 'item': 6 },
    { 'key': 7, 'item': 7 },
    { 'key': 8, 'item': 8 },
    { 'key': 12, 'item': 95 },
    { 'key': 61, 'item': 10 },
    { 'key': 33, 'item': 67 },
    { 'key': 13, 'item': 0 },
  ]);

  const [Refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...items, { 'key': 41, 'item': 34 }]);
    setRefreshing(false);
  };

  return (

    <ScrollView
      horizontal={false}
      style={styles.body}
      refreshControl={
        <RefreshControl
          refreshing={Refreshing}
          onRefresh={onRefresh}
          colors={['#0e2']}
        />
      }
    >
      {
        items.map((i) => {
          return (
            <View style={styles.item} key={i.key}>
              <Text style={styles.text}>Item {i.item}</Text>
            </View>
          )
        })
      }
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },

  item: {
    margin: 10,
    backgroundColor: '#00f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#000000',
    fontSize: 35,
    fontStyle: 'italic',
    margin: 10,
  },
});


export default App;
