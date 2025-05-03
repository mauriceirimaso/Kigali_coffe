import styles from './Tradecss';
import { updatebalance } from './handlefunctions/Reorder';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  StatusBar,
  Button,
  TouchableOpacity,
  Switch,
} from 'react-native';

// Define the props type for the component
interface HistoryProps {
  name: string;
  title: string;
  color: string;
  id: any;
  cost: string;
  image: string;
  date: string;
  time: string;
  coffeid: number;
  status: string;
}


const History: FC<HistoryProps> = (props) => {
  const {
    name,
    title,
    color,
    id,
    cost,
    image,
    date,
    time,
    coffeid,
    status,
  } = props;



  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const loadTheme = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme !== null) {
                setIsDarkMode(storedTheme === 'dark');
            }
        } catch (error) {
            console.error("Failed to load theme from storage", error);
        }
    };

    loadTheme();
}, []);

  return (

   
    <>
      <View style={styles.package}>
        <View style={styles.type}>
          <Text style={isDarkMode? { color: 'rgb(213, 213, 203)', fontWeight: '700' } :{ color: 'rgb(123, 121, 119)', fontWeight: '700' }}>
            {name}
          </Text>
          <Text
            style={{
              color: `${color}`,
              marginLeft: '4%',
              fontWeight: '800',
            }}
          >
            {status}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.contentphoto}>
            <Image
              source={{ uri: image }}
              style={{ width: '90%', height: '80%', borderRadius: 9 }}
            />
          </View>
          <View style={styles.restcontent}>
            <View style={styles.restheading}>
              <Text style={isDarkMode? { fontWeight: '800', fontSize: 12,color:'white' } :{ fontWeight: '800', fontSize: 12 }}>{title}</Text>
              <Text style={isDarkMode? { fontWeight: '800', color: 'rgb(213, 213, 203)' } :{ fontWeight: '800', color: 'rgb(123, 121, 119)' }}>
                {id}
              </Text>
            </View>
            <View style={styles.restheading}>
              <Text style={isDarkMode? { fontWeight: '800', fontSize: 12,color:'white' } :{ fontWeight: '800', fontSize: 12 }}>{cost}</Text>
              <Text style={isDarkMode? { fontSize: 12,color:'white' } : { fontSize: 12 }}>{`${time}. ${date}`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentlinks}>
          <TouchableOpacity style={styles.trackorder}>
            <Text style={{ fontWeight: '700' }}>rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() => updatebalance(coffeid)}
            style={styles.trackorder2}
          >
            <Text style={{ fontWeight: '700' }}>re-order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default History;
