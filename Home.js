import {StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function Home({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [myData, setMyData] = useState(null);
  const [status, setStatus] = useState('Ready to save data');
  const [del, setdel] = useState('Ready to delete data');
  const [up, setup] = useState('Ready to update daata');

  // useEffect(() => {
  //   getDatabase();
  // }, []);

  const getDatabase = async () => {
    try {
      const data = await firestore()
        .collection('User')
        .doc('fnxLlPt79xL9Ju4UMga2')
        .get();

      setMyData(data._data);
      console.log(data._data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = () => {
    setStatus('Saving data...');
    firestore()
      .collection('User')
      //   .doc('kbkQwzlJojQabEHia9YE')
      .add({First_Name: firstName, Last_Name: lastName})
      .then(() => {
        setStatus('Data saved!');
      })
      .catch(error => {
        setStatus(`Error saving data: ${error}`);
      });
  };

  const update = () => {
    setup('Updating data...');
    firestore().collection('User').doc('ZsUPCFbTHzjeCpk92613').update({
      First_Name: firstName,
      Last_Name: lastName,
    });
    setup('Data Updated...');
  };
  const Delete = () => {
    setdel('Deleting data...');
    firestore().collection('User').doc('ZsUPCFbTHzjeCpk92613').delete();
    setdel('Data deleted...');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.text}>{status}</Text>
        <Text style={styles.text}>{del}</Text>
        <Text style={styles.text}>{up}</Text> */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="grey"
            onChangeText={firstName => setFirstName(firstName)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="grey"
            onChangeText={lastName => setLastName(lastName)}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={() => navigation.navigate('dashboard')}
          onPress={handleSave}>
          <Text style={styles.loginText}> Add New Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={update}>
          <Text style={styles.loginText}> Update data with id </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={Delete}>
          <Text style={styles.loginText}> Delete data with id </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Data')}>
          <Text style={styles.loginText}> Fetch All loaded Data </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={getDatabase}>
          <Text style={styles.loginText}> Fetch data using id </Text>
        </TouchableOpacity>

        <Text style={{fontSize: 20}}>
          First Name :- {myData ? myData.First_Name : 'Loading...'}
        </Text>

        <Text style={{fontSize: 20}}>
          Last Name :- {myData ? myData.Last_Name : 'Loading...'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',
  },

  inputView: {
    // backgroundColor: 'lightgrey',
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
  },

  forgot_button: {
    height: 20,
    marginBottom: 30,
    color: 'black',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'black',
  },
  loginText: {
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
});
