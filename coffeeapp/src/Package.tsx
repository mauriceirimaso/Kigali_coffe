import styles from './Tradecss';
import React, { useState, FC } from 'react';
import { handleCancelOrder } from './handlefunctions/Cancelorder';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


import axios from 'axios';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  Modal,
  StatusBar,
  Button,
  TouchableOpacity,
  Switch,
  Pressable,
} from 'react-native';


interface PackageProps {
  name: any;
  title: any;
  time: any;
  
  id: any;
  cost: any;
  image: any;
  date: any;
  coffeid: any;
  
}


const Package: FC<PackageProps> = (props) => {
  const { 
    name, 
    title, 
    time, 
     
    id, 
    cost, 
    image, 
    date, 
    coffeid, 
     
  } = props;


  const [visiblemodal,setvisiblemodal]=useState(false);
  const [location, setLocation] = useState(null);
  const [formattedAddress,setFormattedAddress]=useState('Kigali');


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


const blackMapStyle = [
  { elementType: "geometry", stylers: [{ color: '#7C7777' }] },
  { elementType: "labels", stylers: [{ visibility: "yes" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#9CA3AF" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#5B5B5B" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#000" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#6C6C6C" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#8A8A8A" }] },
];


  useEffect(() => {
    const fetchLocationData = async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
  
      
      let currentLocation = await Location.getCurrentPositionAsync({}) as any;
      setLocation(currentLocation);
      console.log("Current location:", currentLocation);
  
      
      if (currentLocation.coords) {
        const { latitude, longitude } = currentLocation.coords;
        const coordinates = { latitude, longitude };
  
        try {
          
          const [address] = await Location.reverseGeocodeAsync(coordinates);
          console.log("Address from current location:", address);
  
          
          const newFormattedAddress = `${address.formattedAddress} ${address.subregion} ${address.district}`;
          setFormattedAddress(newFormattedAddress);
          console.log("Formatted Address:", newFormattedAddress);
        } catch (error) {
          console.error("Error getting address:", error);
        }
      }
    };
  
    fetchLocationData();
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
             
              marginLeft: '4%',
              fontWeight: '800',
            }}
          >
            
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
              <Text style={isDarkMode? { fontWeight: '800', color: 'rgb(213, 213, 203)' }:{ fontWeight: '800', color: 'rgb(123, 121, 119)' }}>
                {id}
              </Text>
            </View>
            <View style={styles.restheading}>
              <Text style={isDarkMode? { fontWeight: '800', fontSize: 12,color:'white' }: { fontWeight: '800', fontSize: 12 }}>{cost}</Text>
              <Text style={isDarkMode?{ fontSize: 12 ,color:'white'}: { fontSize: 12 }}>{`${date} .${time}`}</Text>
            </View>
          </View>
        </View>


        <Modal
                                       animationType="fade" 
                                      transparent={true} 
                                       visible={visiblemodal}
                                         onRequestClose={() => setvisiblemodal(false)} 
           >
                   <Pressable style={isDarkMode? styles.blackmodalview :styles.modalview}>
                    <View style={styles.upper}>
                    <TouchableOpacity style={styles.minimize} onPress={()=>{setvisiblemodal(false)}}>
                              <Icon name="arrow-left" size={15} color="#000" />
                    </TouchableOpacity>
                    <Text style={{fontWeight:'700',fontSize:14,marginLeft:'4%',marginTop:'2%'}}>Adress:</Text>
                    <Text style={{color:'black',fontSize:11,fontWeight:'600',marginTop:'2%'}}>{formattedAddress}</Text>
                         
                    </View>

                    <View style={styles.google}>
                   
                        {/* {location && (
                         <MapView
                           customMapStyle={isDarkMode? blackMapStyle : null}
                           style={styles.map}
                           initialRegion={{
                             latitude: location.coords.latitude,
                             longitude: location.coords.longitude,
                             latitudeDelta: 0.1,
                             longitudeDelta: 0.1,
                           }}
                         >
                           <Marker
                             coordinate={{
                               latitude: location.coords.latitude,
                               longitude: location.coords.longitude,
                             }}
                             title="Your Location"
                           />
                         </MapView> 
                       )}  */}


                     </View>
                     <View style={styles.lower}>
                         <Text style={{color:'rgba(130, 40, 10, 0.815)',fontWeight:'800'}}>30' Min remaining(00:30)</Text>
                     </View>

                  </Pressable>

         </Modal>

        <View style={styles.contentlinks}>
            <TouchableOpacity style={styles.trackorder2} onPress={()=>{setvisiblemodal(true)}}>
            <Text style={styles.track}>Track order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.trackorder} onPress={() => handleCancelOrder(coffeid)}>
            <Text style={styles.track}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Package;
