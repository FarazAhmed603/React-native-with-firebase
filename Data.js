import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Data({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionRef = firestore().collection('User');
    collectionRef.get().then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setData(data);
      //   console.log(setData);
    });
  }, []);

  const ItemView = ({item}) => {
    console.log('flat list', item);
    return (
      <ScrollView>
        <View style={{margin: 3}}>
          <Text style={styles.text}> {item.First_Name}</Text>
          <Text style={styles.text}> {item.Last_Name}</Text>
          <Text style={styles.text}>--------------------------</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Text style={styles.text}>Data</Text> */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
