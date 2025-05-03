import styles from './Settingscss';
const settingsphoto =require('../assets/profileicons/settings.png');
const search =require( '../assets/settingsicon/search.png');
const search2 =require( '../assets/settingsicon/searchsubmit.png');
const profilephoto =require( '../assets/settingsicon/profilephoto.png');
const gold =require( '../assets/settingsicon/gold.png');
const profile =require( '../assets/settingsicon/smallicons/profile.png');
const password =require( '../assets/settingsicon/smallicons/password.png');
const deposit =require( '../assets/settingsicon/smallicons/deposit.png');
const notification =require( '../assets/settingsicon/smallicons/notification.png');
const about =require( '../assets/settingsicon/smallicons/about.png');
const privacy =require( '../assets/settingsicon/smallicons/privacy.png');
const socials =require( '../assets/settingsicon/smallicons/socials.png');
const logout =require( '../assets/settingsicon/smallicons/logout.png');
const night =require( '../assets/settingsicon/smallicons/night.png');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Alert } from 'react-native';
 

import { useNavigation } from '@react-navigation/native';

const twitter =require('../assets/settingsicon/twitter.png');
const apple =require('../assets/settingsicon/apple.png');

import { useState,useEffect } from 'react';

const google =require('../assets/settingsicon/google.png');

const watsapp =require('../assets/settingsicon/smallicons/watsapp.png');


import Search from './Search';

import Login from './Login';


import Footer from './Footer';

import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    ImageBackground,
    TextInput,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    Button,
    TouchableOpacity,
    Switch,
  
     } from 'react-native';

     import React, { useMemo, useRef } from 'react';

     interface UserDetails {
        profilephoto: string;
        fullnames: string;
        membership: string;
      }

 const Settings: React.FC = () => {


  

  const [userDetails, setUserDetails] = useState<UserDetails>({
    profilephoto: '',
    fullnames: '',
    membership: '',
  });


  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isloading,setisloading]=useState(false,)


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

  const baseurl = 'https://rendersmartcoffe.onrender.com';

  


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




 const toggleTheme = async () => {
  try {
    
    await AsyncStorage.removeItem('theme');

    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  } catch (error) {
    console.error("Failed to toggle theme or save to storage", error);
  }
};






  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setisloading(true);
        const response = await fetch(`${baseurl}/api/getuserdetails/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        console.log('Fetched user details:', result);
        setUserDetails(result);
        setisloading(false)
      } catch (error) {
        console.error('Error fetching user details:', error);
        setisloading(true);
      }
    };

    fetchUserDetails();
  }, []);


  const navpage=()=>
  {
      navigation.navigate('Page');
  };


  const handleLogout = async () => {
     try {
       const response = await fetch(`${baseurl}/logout/`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
       });
 
       if (response.ok) {
         Alert.alert('Success', 'Logout successful!');
         navigation.replace('Login'); 
       } else {
         const data = await response.json();
         
       }
     } catch (error) {
       
       console.error(error);
     }
   };

  const navigation = useNavigation() as any;
  
  return(<>
    <StatusBar barStyle="light-content" backgroundColor={isDarkMode? 'rgb(28, 27, 27)' : 'black'}  />
      <View style={isDarkMode? styles.darkgrandview: styles.grandview}>
           <View style={isDarkMode? styles.darkblackview :styles.blackview}>
               <View style={styles.settings}>
                      <View style={styles.settingicon}>
                         <Image style={{width:'70%',height:'70%'}} source={settingsphoto}/>
                      </View>
                      <View style={styles.settingtext}>
                                <Text style={{fontWeight:'800',color:'white'}}>Settings</Text>
                      </View>
               </View>
               <View style={styles.searchview}>
                   <View style={styles.searchicon}>
                      <Image style={{width:'60%',height:'60%'}} source={search}/>
                   </View>
                   <TextInput placeholder='search' placeholderTextColor='rgb(172, 168, 168)' editable={false} style={styles.input}/>
                   <TouchableOpacity style={styles.searchsubmit}>
                        <Search/>
                   </TouchableOpacity>
               </View>

               <View style={isDarkMode? styles.darksettingsview :styles.settingsview}>
                    <View style={isDarkMode? styles.darkprofiledata :styles.profiledata}>
                          
                         {isloading?

                        <View style={{borderColor:'red',width:'100%',height:'40%'}}>
                            <ActivityIndicator size={27} color="rgba(227, 171, 17, 0.815)" />
                        </View>


                         :
                         <>
                         <View style={styles.profilepicture}>
                         <Image style={{borderRadius:20,width:'60%',height:'70%'}} source={{uri:`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/profilephotoes/${userDetails?.profilephoto}.png?t=2024-10-13T14%3A58%3A59.223Z`}}/>
                          </View>

                          <View style={styles.profilename}>
                             <Text style={isDarkMode?  {color:'white',fontWeight:'900'}:{fontWeight:'900'}}>{userDetails?.fullnames}</Text>
                             <View style={styles.horizontal}>
                               <Image style={{width:'10%',height:'100%'}} source={gold}/>
                               <Text style={isDarkMode? {color:'rgb(220, 207, 207)',fontWeight:'800',fontSize:10} :{color:'rgb(91, 88, 88)',fontWeight:'800',fontSize:10}}>{userDetails?.membership}</Text>
                             </View>
                          </View>
                          </>
                         
                         }
                         



                    </View>



                    <View style={isDarkMode? styles.darklowersettings :styles.lowersettings}>
                    <View style={styles.settingpara}>
                       <Text style={isDarkMode? {color:'rgb(230, 221, 221)',fontWeight:'800',fontSize:14,marginLeft:'5%'} :{color:'rgb(91, 88, 88)',fontWeight:'800',fontSize:14,marginLeft:'5%'}}>Account Settings</Text>
                    </View>


                    <View style={styles.links}>
                          <TouchableOpacity style={styles.addlink}>
                               <View style={styles.linkp}>
                                    <Text style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>edit profile</Text>
                               </View>
                               <View style={styles.linksign}>
                                     <Image source={profile}/>
                               </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addlink}>
                               <View style={styles.linkp}>
                               <Text style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>change password</Text>
                               </View>
                               <View style={styles.linksign}>
                                     <Image source={password}/>
                               </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addlink}>
                               <View style={styles.linkp}>
                               <Text style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>add deposit method</Text>
                               </View>
                               <View style={styles.linksign}>
                                     <Image source={deposit}/>
                               </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addlink}>
                               <View style={styles.linkp}>
                               <Text style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>push notification</Text>
                               </View>
                               <View style={styles.linksign}>
                                     <Image source={notification}/>
                                     
                               </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addlink} onPress={()=>{toggleTheme()}}>
                               <View style={{width:'80%',borderColor:'red'}}>
                               <Text style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>Theme</Text>
                               </View>
                               <View style={{width:'20%',borderColor:'red',justifyContent:'center',alignItems:'center',marginLeft:'4%'}}>
                                {isDarkMode?
                                  <Image source={night} />
                                :
                                  <Icon name="sun-o" size={20} color="#FFD700" />
                                }
                                     
                               </View>
                          </TouchableOpacity>
                      </View>
                    </View>

                         
                    <View style={isDarkMode? styles.darkmoresettings:styles.moresettings}>
                        <View>
                            <Text style={isDarkMode? {color:'rgb(240, 235, 235)',fontWeight:'900',marginLeft:'5%'} :{color:'rgb(91, 88, 88)',fontWeight:'900',marginLeft:'5%'}}>More</Text>
                       </View>
                       <View style={{height:'100%',marginLeft:'5%',marginTop:'5%'}} >
                          <TouchableOpacity style={styles.addlink2}>
                               <View style={styles.linkp}>
                                    <Text  style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>about us </Text>
                               </View>
                               <View style={styles.linksign}>
                                     <Image source={about}/>
                               </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addlink2}>
                               <View style={styles.linkp}>
                               <Text  style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>privacy & policies </Text>
                               </View>
                               <View style={styles.linksign}>
                                    <Image source={privacy}/>
                               </View>
                          </TouchableOpacity>
                          
                          <TouchableOpacity style={styles.addlink2}>
                               <View style={styles.linkp}>
                               <Text  style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>our socials</Text>
                               </View>
                               <View style={styles.linksign}>
                                    <Image source={socials}/>
                               </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addlink2} onPress={() =>handleLogout()} >
                               <View style={styles.linkp}>
                               <Text  style={isDarkMode? {color:'rgb(182, 176, 176)',fontWeight:'500'} :{fontWeight:'500'}}>logout</Text>
                               </View>
                               <View style={styles.linksign}>
                                     <Image source={logout}/>
                               </View>
                          </TouchableOpacity>
                          </View>
                    </View>

               </View>
               
           <View style={styles.socialsview}>
                
              <View style={styles.lowersocial}>
                <TouchableOpacity style={styles.media}>
                    <Image source={apple}/>
                </TouchableOpacity>
                

                <TouchableOpacity style={styles.media1}>
                    <Image style={{width:'80%',height:'80%'}} source={twitter}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.media}>
                    <Image source={google}/>
                </TouchableOpacity>
                
               
             </View>
           </View>
               
               
           </View>

           
      </View>
      <View style={isDarkMode? styles.darkfooter:styles.footer}>
            <Footer darkModeFromProps={isDarkMode}/>
       </View>
  </>)
};

export default Settings