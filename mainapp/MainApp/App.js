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
  TextInput,
  TouchableOpacity,
} from 'react-native';



const App = () => {

  const [name, setname] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onClickHandler = () => {
    setSubmitted(!submitted);
  }

  return (

    <View style={styles.body}>
      <Text style={styles.text}>Enter your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Amar"
        maxLength={20}
        onChangeText={(text) => { setname(text) }}
      // keyboardType='phone-pad'
      // editable={false}
      // secureTextEntry={true}
      />
      {/* <Button
        title={submitted ? 'Clear' : 'Submit'}
        onPress={onClickHandler}
        color='#008080'
      /> */}
      <TouchableOpacity
      style={styles.button}
      onPress={onClickHandler}
      >
        <Text style={styles.text}>
          {submitted ? 'Clear' : 'Submit'}
        </Text>
      </TouchableOpacity>
      {submitted ? <Text style={styles.text}>Hello {name}</Text> : null}
    </View>

  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },

  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },

  button: {
    width: 150,
    height: 50,
    backgroundColor: '#008080',
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 20,
    borderRadius: 2,
  }

});


export default App;
