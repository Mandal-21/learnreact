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

  const [DATA, setDATA] = useState([
    {
      title: 'Title 1',
      data: ['Item 1-1', 'Item 1-2'],
    },
  ])

  const [Refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    const adding_index = DATA.length + 1;
    setDATA([...DATA, { title: 'Title ' + adding_index.toString(), data: ['Item ' + adding_index.toString() + '-1', 'Item ' + adding_index.toString() + '-2'] }]);
    setRefreshing(false);
  };

  return (

    <SectionList
      keyExtractor={(item, index) => index.toString()}
      sections={DATA}
      renderItem={({ item }) =>
        <View style={styles.item}>
          <Text style={styles.text_item}>{item}</Text>
        </View >
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <Text style={styles.text_header}>{section.title}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={Refreshing}
          onRefresh={onRefresh}
          colors={['#0e2']}
        />
      }
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
    //       onRefresh={onRefresh}
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

  header: {
    borderColor: '#000',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00f0f0',
  },

  text_header: {
    color: '#000000',
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  item: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text_item: {
    fontSize: 25,
    color: '#000',
    margin: 5,
  },
});


export default App;
