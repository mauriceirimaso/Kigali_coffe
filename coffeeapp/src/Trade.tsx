import styles from  './Tradecss';
const privacy =require('../assets/settingsicon/smallicons/privacy.png');
const settingsphoto =require('../assets/footericons/order3.png');
const search =require('../assets/settingsicon/search.png');
const search2 =require('../assets/settingsicon/searchsubmit.png');
const profilephoto1 =require('../assets/settingsicon/profilephoto.png');
const gold =require('../assets/settingsicon/gold.png');
const profile=require('../assets/settingsicon/smallicons/profile.png');
const coffephoto2 =require('../assets/productimages/coffe2.png');
const coffephoto3 =require('../assets/productimages/coffe3.png');

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from './Footer';

const history =require('../assets/emptyphotoes/history.png');
const orders =require('../assets/emptyphotoes/orders.png');

import axios from 'axios';

const coffephoto1 =require('../assets/productimages/coffe1.png');

import History from './History';
import Package from './Package';
import Emptyrecord from './Emptyrecord';
import Search from './Search';
import Emptysearch from './Emptysearch';

import React, { useState ,useEffect} from 'react';


import { 
   SafeAreaView,
   Text, 
   Image,
   View ,
   Modal,
   ImageBackground,
   TextInput,
   Dimensions,
   Keyboard,
   StatusBar,
   Button,
   TouchableOpacity,
   ActivityIndicator,
   Switch,
   ScrollView,
   KeyboardAvoidingView,
 
    } from 'react-native';
import Production from './Product';

    interface UserDetails {
      profilephoto: string;
      fullnames: string;
      membership: string;
    }
  
    interface OrderData {
      id: any;
      producttype: any;
      productname: any;
      orderid: any;
      coffephoto: any;
      coffeid:any,
      price: any;
      date: any;
      time: any;
      status?: any;
    }

    const Trade: React.FC = () => 
{

   const [photo,setphoto]=useState(null);
   const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
   const [activeLink, setActiveLink] = useState<'ongoing' | 'history'>('ongoing');
   const [data, setData] = useState<OrderData[]>([]);
   const [productname,setproductname]=useState("");
   const [issearching,setissearching]=useState(false);
    const[historycount,sethistorycount]=useState(0);
  const [iskeybordvisible,setiskeybordvisible]=useState(false)
  const [issearchingorder,setissearchingorder]=useState(false)
  const [isfetchinghistory,setisfetchinghistory]=useState(false)



  const [location, setLocation] = useState(null);
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


  const listenForKeyboard = () => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setiskeybordvisible(true);
    });
  
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setiskeybordvisible(false)
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }; 
  
  useEffect(() => {
    const unsubscribe = listenForKeyboard();
    return unsubscribe;
  }, []);




    

  //  const baseurl='https://rendersmartcoffe.onrender.com';
   const baseurl='http://127.0.0.1:8000';  
   




   const fetchhistorycount = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/unreadhistory/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      sethistorycount(response.data.unreads);
    } catch (error) {
      console.error('Error fetching history count:', error);
    }
  };

  const markhistoryasread = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/updatehistory/`);
      if (response.status === 200) {
       
        sethistorycount(0); 
      }
    } catch (error) {
      console.error('Error marking history as read:', error);
      
    }
  };

  useEffect(() => {
    fetchhistorycount();

    const intervalId = setInterval(fetchhistorycount, 1000);

    return () => clearInterval(intervalId); 
  }, []);


 

  useEffect(() => {
    const fetchLocationData = async () => {
      await Location.requestForegroundPermissionsAsync();
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    fetchLocationData();
  }, []);













   useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${baseurl}/api/getuserdetails/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          console.log('Fetched user details:', result);
          setUserDetails(result);
          if (result.coffephoto) {
            setphoto(result.profilephoto);
            console.log("photo url",photo)
        }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserDetails();
    }, []);



  const searchdata = async (productname) => {
      try {

          setissearchingorder(true)
          setisfetchinghistory(false)

          setData([]);
  
          
          const url =
              activeLink === 'ongoing'
                  ? `${baseurl}/api/searchorders/`
                  : `${baseurl}/api/searchhistory/`;
  
          
          const response = await axios.post(url, {
              productname: productname,  
          }, {
              headers: {
                  'Content-Type': 'application/json'  
              }
          });
  
          
          setData(response.data); 
          setissearchingorder(false)
  
      } catch (error) {
          console.error('Error fetching data:', error);
          setissearchingorder(false)
          
      }
  };
  
  const handleSearch = () => {
    if (productname.trim()) {
        searchdata(productname); 
    } else {
        console.log('Please enter a product name'); 
    }
};


    useEffect(() => {
      const fetchData = async () => {
        try {
          setisfetchinghistory(true)
          setData([]); 
          const url =
            activeLink === 'ongoing'
              ? `${baseurl}/api/getallorders/`
              : `${baseurl}/api/getallhistory/`;
  
          const response = await axios.get<OrderData[]>(url, {
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.status === 200) {
            setData(response.data);
            setisfetchinghistory(false)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setisfetchinghistory(false)
        }
      };
      fetchData();
    }, [activeLink]); 


     return<>
           <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'}  />
           
            <KeyboardAvoidingView style={isDarkMode? iskeybordvisible ? styles.darkgrandview1 : styles.darkgrandview :iskeybordvisible ? styles.grandview1 : styles.grandview}>
                 <View style={iskeybordvisible ? styles.blackview2:styles.blackview}>
                     <View style={styles.settings}>
                            <View style={styles.settingicon}>
                               <Image style={{width:'50%',height:'50%'}} source={settingsphoto}/>
                            </View>

                            <View style={styles.settingtext}>
                                      <Text style={{fontWeight:'800',color:'white'}}>My Orders</Text>
                            </View>
                     </View>
                     <View style={styles.searchview}>
                         <View style={styles.searchicon}>
                            <Image style={{width:'60%',height:'60%'}} source={search}/>
                         </View>
                         <TextInput placeholder='  search '
                                     
                                    placeholderTextColor="white"
                                    style={styles.input}
                                    value={productname}
                                    onChangeText={setproductname} 
                                     keyboardAppearance="default"
                                    />

                                    {issearchingorder?

                                    <View style={{borderColor:'red',flex:1,height:'100%',justifyContent:'center',alignItems:'center'}}>

                                          <ActivityIndicator 
                                          size={18} 
                                          color="rgba(227, 171, 17, 0.815)" 
                                          style={{ transform: [{ scale: 1.5 }] }}
                                          />
                                    </View>
                                     :

                                     <TouchableOpacity style={styles.searchsubmit} onPress={()=>{handleSearch(),setissearching(true)}}>
                                           <Search/>
                                     </TouchableOpacity>
                                    }
                         
                     </View>
                  </View>


                 


                  <View style={isDarkMode? styles.darksettingsview :styles.settingsview}>
                          <View style={isDarkMode? iskeybordvisible? styles.darkprofiledata2:styles.darkprofiledata :iskeybordvisible? styles.profiledata2:styles.profiledata}>
                               <View style={styles.profilepicture}>
                               {userDetails && (
                                   <Image style={{width:'60%',height:'75%',borderRadius:12}} source={{uri:`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/profilephotoes/${userDetails.profilephoto}.png?t=2024-10-13T14%3A58%3A59.223Z`}}/> 
                               )}
                               </View>
                               <View style={styles.profilename}>
                               {userDetails && (
                                 <>
                                       <Text style={isDarkMode? {fontWeight:'900',color:'white'} :{fontWeight:'900'}}>{userDetails.fullnames || 'loading....'}</Text> 
                                      <View style={styles.horizontal}>
                                          <Image style={{width:'10%',height:'100%'}} source={gold}/>
                                           <Text style={isDarkMode? {color:'rgb(215, 215, 208)',fontWeight:'800',fontSize:10} :{color:'rgb(91, 88, 88)',fontWeight:'800',fontSize:10}}>{userDetails.membership ||'loading....'}</Text> 
                                      </View>
                                     
                                 </>
                                  )}
                               </View>
                          </View>


                          <View style={isDarkMode? styles.darktrade :styles.trade}>


                            <View style={iskeybordvisible ? styles.tradeheading2:styles.tradeheading}>
                                 <TouchableOpacity  style={[styles.ongoing, activeLink === 'ongoing' && styles.activeLink]}     onPress={() => {setActiveLink('ongoing'),setissearching(false)}}>
                                 <Text style={
                                      isDarkMode?
                                          [{ fontWeight: '800', color: 'white' }, activeLink === 'ongoing' && styles.activeText]
                                         : [{ fontWeight: '800', color: 'black' }, activeLink === 'ongoing' && styles.activeText]
                                     }>
                                   ongoing
                                 </Text>

                                 </TouchableOpacity>
                                 <TouchableOpacity style={[styles.ongoing2, activeLink === 'history' && styles.activeLink]}  onPress={() => {setActiveLink('history'),setissearching(false),markhistoryasread()}}>
                                    
                                    


                                 <Text style={
                                        isDarkMode
                                           ? [{ fontWeight: '800', color: 'white' }, activeLink === 'history' && styles.activeText]
                                           : [{ fontWeight: '800', color: 'black' }, activeLink === 'history' && styles.activeText]
                                       }>
                                     History
                                       </Text>


                                     {historycount > 0 && (
                                     <View style={styles.new}>
                                        <Text style={{fontWeight:'700',marginTop:'-10%',color:'white',fontSize:12}}>new+{historycount}</Text>
                                     </View>
                                     )}

                                 </TouchableOpacity>
                            </View>
 
                              <View style={styles.tradeorders}>
                                 <ScrollView showsVerticalScrollIndicator={false} style={{borderColor:'green',height:'100%',width:'90%',marginLeft:'5%',overflow:'hidden'}}>


                              {(issearchingorder||isfetchinghistory)?
                              
                                   <View style={{borderColor:'red',marginLeft:'30%',justifyContent:'center',alignItems:'center',width:'30%',height:30,marginTop:'50%'}}>

                                         <ActivityIndicator 
                                         size={18} 
                                         color="rgba(227, 171, 17, 0.815)" 
                                         style={{ transform: [{ scale: 1.5 }] }}
                                          />
                                    </View>      
                               :

                                
                              <>
                              
                                
                                 {issearching ? (
                                          data.length === 0 ? (
                                            <Emptysearch />
                                          ) : activeLink === 'ongoing' ? (
                                            data.map((item) => (
                                              <Package
                                                key={item.id}
                                                coffeid={item.id}
                                                name={item.producttype}
                                                title={item.productname}
                                                id={`#${item.orderid}`}
                                                image={`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${item.coffephoto}.png`}
                                                cost={`$${parseFloat(item.price).toFixed(2)}`}
                                                date={item.date}
                                                time={item.time}
                                              />
                                            ))
                                          ) : (
                                            data.map((item) => (
                                              <History
                                                key={item.id}
                                                coffeid={item.id}
                                                name={item.producttype}
                                                title={item.productname}
                                                id={`#${item.orderid}`}
                                                image={`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${item.coffephoto}.png`}
                                                cost={`$${parseFloat(item.price).toFixed(2)}`}
                                                date={item.date}
                                                time={item.time}
                                                status={item.status}
                                                color={item.status === 'canceled' ? 'red' : 'green'}
                                              />
                                            ))
                                          )
                                              ) : activeLink === 'ongoing' ? (
                                                data.length > 0 ? (
                                                  data.map((item) => (
                                                    <Package
                                                      key={item.id}
                                                      coffeid={item.id}
                                                      name={item.producttype}
                                                      title={item.productname}
                                                      id={`#${item.orderid}`}
                                                      image={`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${item.coffephoto}.png`}
                                                      cost={`$${parseFloat(item.price).toFixed(2)}`}
                                                      date={item.date}
                                                      time={item.time}
                                                    />
                                                  ))
                                                ) : (
                                                  <Emptyrecord photo={orders} />
                                                )
                                              ) : data.length > 0 ? (
                                                data.map((item) => (
                                                  <History
                                                    key={item.id}
                                                    coffeid={item.id}
                                                    name={item.producttype}
                                                    title={item.productname}
                                                    id={`#${item.orderid}`}
                                                    image={`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${item.coffephoto}.png`}
                                                    cost={`$${parseFloat(item.price).toFixed(2)}`}
                                                    date={item.date}
                                                    time={item.time}
                                                    status={item.status}
                                                    color={item.status === 'canceled' ? 'red' : 'green'}
                                                  />
                                                ))
                                              ) : (
                                                <Emptyrecord photo={history} />
                                              )}
                                              
                                              </>
                                              
                                              }
                                                                                    
                                 </ScrollView>


                              </View>

                        


                          </View>

                    

                </View>
           </KeyboardAvoidingView>
           <View style={isDarkMode? iskeybordvisible ? {display:'none'}: styles.darkfooter : iskeybordvisible ? {display:'none'}: styles.footer}>
                  <Footer darkModeFromProps={isDarkMode}/>
             </View>
         </>
}
export default Trade