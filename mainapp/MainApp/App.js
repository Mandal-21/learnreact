import React, {useState} from 'react';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {

  const [session, setSession] = useState({number:0, howManyTimes: 0});

  const onClickHandler = () => {
    setSession({number: session.number + 5, howManyTimes: session.howManyTimes + 1});
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{session.number}</Text>
      <Button title='Update State' onPress={onClickHandler}></Button>
      <Text style={styles.text}>You Clicked {session.howManyTimes} times</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#000fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#00f000',
    borderRadius: 10,
    margin: 40,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
    textTransform: 'uppercase',
  } 
});

export default App;
