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
  FlatList,
  SectionList,
} from 'react-native';



const App = () => {

  const [items, setItems] = useState([
    { 'name': '1' },
    { 'name': '2' },
    { 'name': '3' },
    { 'name': '4' },
    { 'name': '5' },
    { 'name': '6' },
    { 'name': '7' },
    { 'name': '8' },
    { 'name': '95' },
    { 'name': '10' },
    { 'name': '67' },
    { 'name': '0' },
  ]);

  const DATA = [
    {
      title: 'Title 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3'],
    },
    {
      title: 'Title 2',
      data: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
    {
      title: 'Title 3',
      data: ['Item 3-1', 'Item 3-2'],
    },
    {
      title: 'Title 4',
      data: ['Item 4-1'],
    },
  ]

  const [Refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...items, { 'name': 34 }]);
    setRefreshing(false);
  };

  return (

    <SectionList
      keyExtractor={(item, index) => index.toString()}
      sections={DATA}
      renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
      renderSectionHeader={({ section }) => (
        <View style={styles.item}>
          <Text style={styles.text}>Item {section.title}</Text>
        </View>
      )}

    />

    // <FlatList
    //   // numColumns={4}
    //   horizontal={true}
    //   keyExtractor={(item, index) => index.toString()}
    //   data={items}
    //   renderItem={({ item }) => (
    //     <View style={styles.item}>
    //       <Text style={styles.text}>Item {item.name}</Text>
    //     </View>
    //   )}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={Refreshing}
    //       onRefresh={onRefresh}false
    //       colors={['#0e2']}
    //     />
    //   }
    // />

    // <ScrollView
    //   horizontal={false}
    //   style={styles.body}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={Refreshing}
    //       onRefresh={onRefresh}
    //       colors={['#0e2']}
    //     />
    //   }
    // >
    //   {
    //     items.map((i) => {
    //       return (
    //         <View style={styles.item} key={i.key}>
    //           <Text style={styles.text}>Item {i.item}</Text>
    //         </View>
    //       )
    //     })
    //   }
    // </ScrollView>

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
