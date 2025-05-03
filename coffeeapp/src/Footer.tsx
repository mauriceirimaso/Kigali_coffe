import React from 'react'
import styles from './Homecss';
const  home=require('../assets/icons/home.png');
const  notification =require('../assets/icons/notification.png');
const  wallet = require('../assets/icons/wallet.png');
const  favourite =require('../assets/icons/heart.png');
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const profile =require('../assets/footericons/account.png')
const order =require('../assets/footericons/orders.png')
const settings =require('../assets/footericons/settings.png')
const darkhome =require('../assets/footericons/darkicons/home.png');
import Home from './Home';
import Profile from './Profile';
import axios from 'axios';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { GoHome } from "react-icons/go";

 

import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    ImageBackground,
    Dimensions,
    Button,
    TouchableOpacity,
  
     } from 'react-native';
     import { useState,useEffect } from 'react';

  function Footer({ darkModeFromProps }) {

    
    const [notificationCount, setNotificationCount] = useState(0);
    const [orderscount, setorderscount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(darkModeFromProps);

    // const baseurl='https://rendersmartcoffe.onrender.com';

   const baseurl='http://127.0.0.1:8000';

  useEffect(() => {
      setIsDarkMode(darkModeFromProps);
  }, [darkModeFromProps]);



    const fetchNotificationCount = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/countnotification/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotificationCount(response.data.unreads);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

  
    useEffect(() => {
      fetchNotificationCount();
  
      const intervalId = setInterval(fetchNotificationCount, 1000);
  
      return () => clearInterval(intervalId); 
    }, []);






    const fetchorders = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/unreadorders/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setorderscount(response.data.unreads);
      } catch (error) {
        console.error('Error fetching orders count:', error);
      }
    };
    
  
    useEffect(() => {
      fetchorders();
  
      const intervalId = setInterval(fetchorders, 1000);
  
      return () => clearInterval(intervalId); 
    }, []);
    


    const markAllAsRead = async () => {
      try {
        const response = await axios.post(`${baseurl}/api/updatenotification/`);
        if (response.status === 200) {
         
          setNotificationCount(0); 
        }
      } catch (error) {
        console.error('Error marking notifications as read:', error);
        
      }
    };

    const markordersasread = async () => {
      try {
        const response = await axios.post(`${baseurl}/api/updateorders/`);
        if (response.status === 200) {
          
          setorderscount(0); 
        }
      } catch (error) {
        console.error('Error marking orders as read:', error);
        
      }
    };
  


    const navigation = useNavigation() as any;
    return(<>
    <View style={isDarkMode? styles.darkfooterview : styles.footerview}>
        <View style={isDarkMode? styles.darklowerlink :styles.lowerlink}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'100%',height:'100%',}} onPress={() => navigation.navigate('Home')}>
                  {isDarkMode?
                   <Icon
                   name="home"
                   size={30}
                   color="white"
                   style={{
                       backgroundColor: 'black',
                       
                       borderRadius: 5,
                       overflow: 'hidden',
                   }}/>:
                 <Image source={home} style={{justifyContent:'center',alignItems:'center',width:'25%',height:'80%'}} />
                  }
                 

                </TouchableOpacity>   
              </View>
              <View style={styles.lowerlink}>
                 <TouchableOpacity style={{justifyContent:'center',flexDirection:'row',alignItems:'center',width:'114%',height:'80%'}} onPress={() => {navigation.navigate('Trade'),markordersasread()}}>

                    {isDarkMode ?
                    <Icon
                          name="shopping-cart"  
                          size={30}             
                          color="white"         
                     style={{
                       backgroundColor: 'black',  
                                    
                       borderRadius: 5,           
                      overflow: 'hidden',   
            }}
        /> : 
                   <Image source={order} style={{width:'27%',height:'95%',}} />
        }
                      
                    


                      {orderscount > 0 && (
                      <View style={styles.newnot2}>
                            <Text style={{color:'white',fontWeight:'700',fontSize:12}}>+{orderscount}</Text>
                      </View>
                      )}



                </TouchableOpacity>
              </View>
              
             
              <View style={styles.lowerlink}>
                  <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:'100%',height:'130%'}}    onPress={() => navigation.navigate('Settings')}>
                    {isDarkMode? 

                         <Icon
                         name="cog"            
                         size={30}             
                         color="white"          
                         style={{
                             backgroundColor: 'black',   
                                           
                             borderRadius: 5,           
                             overflow: 'hidden',       
                         }}
                         />:
                         <Image source={settings} style={{width:'30%',height:'57%'}} />
                     }
                      
                  </TouchableOpacity>  
              </View>
              <View style={styles.lowerlink}>
               

                
                <TouchableOpacity style={{justifyContent:'center',flexDirection:'row', width:'120%',height:'80%',borderColor:'red'}}          onPress={() => {navigation.navigate('Profile'),markAllAsRead()}}>
                       {isDarkMode?  
                       <Icon
                                name="user"              
                                size={30}             
                                color="white"          
                                style={{
                                    backgroundColor: 'black',   
                                                
                                    overflow: 'hidden',        
                                }}
                               />:
                       <Image source={profile} style={{width:'27%',height:'95%'}} />
                             }
                      

                      {notificationCount > 0 && (

                      <View style={styles.newnot}>
                            <Text style={{color:'white',fontWeight:'700',fontSize:12}}>+{notificationCount}</Text>
                      </View>
                      )}


                </TouchableOpacity> 
              </View>
          </View>
       </>)
   
  
}

export default Footer