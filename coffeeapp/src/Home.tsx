import React from 'react';
import styles from './Homecss';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import MyLoader from './Myloader';
import { Picker } from '@react-native-picker/picker';
import Spinkit from 'react-native-animated-spinkit';
import RNPickerSelect from 'react-native-picker-select';

const searchicon=require('../assets/icons/search.png');
const searchsubmit=require('../assets/icons/searchsubmit.png');
const promo=require('../assets/coffephotoes/promobackground.png');
import ClipLoader from 'react-spinners/ClipLoader';
import PuffLoader from 'react-spinners/PuffLoader';
import AnimatedLoader from 'react-native-animated-spinkit';
import WaveLoader from './Waveloader';
import axios from 'axios';
import Production from './Product';
import Emptysearch from './Emptysearch';
import BeatLoader from 'react-spinners/BeatLoader';
import LottieView from 'lottie-react-native';
import Spinner from 'react-native-spinkit';


import AsyncStorage from '@react-native-async-storage/async-storage';



import Search from './Search';

{/*import Footer from './Footer';
import Order from './Order';
import Profile from './Profile';
import axios from 'axios';*/}


import coffephoto1 from '../assets/productimages/coffe1.png';
import coffephoto2 from '../assets/productimages/coffe2.png';
import coffephoto3 from '../assets/productimages/coffe3.png';
import coffephoto4 from '../assets/productimages/coffe4.png';
import { useNavigation } from '@react-navigation/native';

import * as Location  from 'expo-location'

import { 
    SafeAreaView,
    Text, 
    View ,
    
    StatusBar,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TextInput,
    ScrollView,
    Keyboard,
    ActivityIndicator,
    FlatList,
    Button,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
  
     } from 'react-native';

     import { Alert } from 'react-native';

    


 function Home()
 {  
    const [activeLink, setActiveLink] = useState('allcoffee'); 
    const [search,setsearch]=useState('All-Coffe');
    const [coffeData, setCoffeData] = useState([]);  

   // const baseURL = 'http://172.31.211.66:8000';

    const baseURL = 'http://127.0.0.1:8000/';

    const [selectedCity, setSelectedCity] = useState('Kigali,rwanda');
    
    const [searchValue, setSearchValue] = useState('');
    const [issearching,setissearching]=useState(false);
    const [iskeybordvisible,setiskeybordvisible]=useState(false)
    const [loading,setloading]=useState(true);
    const [issearchingcoffe,setissearchingcoffe]=useState(false)
    const [isfetchingcoffe,setisfetchingcoffe]=useState(false)


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
    
    
    const searchcoffe = async (searchvalue) => {
      try {
        setissearchingcoffe(true);
        setCoffeData([]); 
        console.log("searchvalue", searchvalue);
        console.log("coffetype", search);
        
        const response = await axios.post(`${baseURL}/api/searchcoffee/`, {
          coffetype: search,
          coffename: searchvalue,
        });
  
        console.log('Response Data:', response.data); 
        setCoffeData(response.data);
        setissearchingcoffe(false);
      } catch (error) {
        setissearchingcoffe(false);
        console.error('Error searching data:', error.response ? error.response.data : error.message);
      }
    };
  

    
    
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



    






    const fetchCoffeData = async (coffeType = 'All-Coffe') => {

     try {
       setisfetchingcoffe(true)
       const response = await axios.get(`${baseURL}/AllCoffe/?coffetype=${coffeType}`, {
         headers: {
           'Content-Type': 'application/json',
         },
       });
       console.log('Fetched Coffee Data:', response.data);
       setCoffeData(response.data);
       setisfetchingcoffe(false)
     } catch (error) {
       console.error('Error fetching data', error);
       
     }
   };
 
   
   useEffect(() => {
     fetchCoffeData(); 
   }, []);


   const renderCoffeRows = () => {
    const rows = [];
  
    
    if (issearching && coffeData.length === 0) {
      rows.push(<Emptysearch key="empty-search" />);
      return rows; 
    }
  
   
    for (let i = 0; i < coffeData.length; i += 2) {
      const id1 = coffeData[i]?.id;
      const id2 = coffeData[i + 1]?.id;
  
      console.log(`ID for coffeData[${i}]: `, id1);
      if (id2) console.log(`ID for coffeData[${i + 1}]: `, id2);
  
      const image1Url = `${coffeData[i]?.coffephoto}`.trim();
      const image2Url = coffeData[i + 1] ? `${coffeData[i + 1]?.coffephoto}`.trim() : null;
  
      console.log(`Image URL for coffeData[${i}]: `, image1Url);
      if (image2Url) console.log(`Image URL for coffeData[${i + 1}]: `, image2Url);
  
      
      rows.push(
        <View style={styles.twoprod} key={i}>
          <Production
            rating={coffeData[i]?.rating}
            coffename={coffeData[i]?.coffename}
            status={coffeData[i]?.coffekind}
            price={coffeData[i]?.price}
            photo={image1Url}
            id={id1}
          />
          {coffeData[i + 1] && (
            <Production
              id={id2}
              rating={coffeData[i + 1]?.rating}
              coffename={coffeData[i + 1]?.coffename}
              status={coffeData[i + 1]?.coffekind}
              price={coffeData[i + 1]?.price}
              photo={image2Url}
            />
          )}
        </View>
      );
    }
  
    return rows;
  };

  

  


  return(<>
      <StatusBar barStyle="light-content" backgroundColor={isDarkMode?  'black' :'rgb(28, 27, 27)'}  />
        <KeyboardAvoidingView style={isDarkMode? styles.darkhomeview : styles.homeview}>

        <KeyboardAvoidingView style={iskeybordvisible?  styles.superupper2: styles.superupper}>
          
         <View style={styles.upperhome}>
               <View style={styles.location}>
                   <Text style={styles.locationpara}>location</Text>
                   <View style={styles.pickercontainer}>
                          


                    </View>
                </View>
                <View style={styles.searchbox}>
                  <View style={styles.searchicon}>
                  <Image 
                       source={searchicon} 
                       style={{ 
                       width: '50%', 
                       height: '50%', 
                        
                       }} 
                      />
                  </View>

                  <View style={styles.searchinput}>
                     <TextInput value={searchValue}
                            onChangeText={(text) => setSearchValue(text)} 
                            placeholderTextColor='rgb(172, 168, 168)' 
                            placeholder='search coffee'
                            style={styles.searchpara}
                           />
                  </View>
                  <View style={styles.lastview}>

                    {issearchingcoffe? 
                    <View style={{width:'60%',marginLeft:'25%', height:'60%',borderColor:'red'}}>
                          <ActivityIndicator size="large" color="rgba(227, 171, 17, 0.815)" />
                    </View>
                    :
                    <TouchableOpacity onPress={() => {searchcoffe(searchValue),setissearching(true)}} style={styles.searching}>
                             <Search/>
                    </TouchableOpacity>

                    }
                   
                  </View>
            </View>



                 <View style={styles.crossview}> 
                     
                     <Image source={promo} style={{width:'100%',height:'100%',borderRadius:20}}></Image>
                        
                </View>   

        </View>
    </KeyboardAvoidingView>
    <View style={styles.navbar}>
                          <TouchableOpacity
                                style={[
                                { width: '25%' },
                                     activeLink === 'allcoffee' && { backgroundColor: 'rgb(225, 171, 70)' ,borderRadius:6},
                                          ]}
                                        onPress={() => { setActiveLink('allcoffee'); fetchCoffeData('All-Coffe');setsearch('All-Coffe') }}
                                           >
                                <View style={styles.coffelinks}>
                                <Text
                                      style={[
                                          { textAlign: 'center', fontWeight: 'bold', marginTop: 3 },
                                          (activeLink === 'allcoffee' || isDarkMode) && { color: 'white' },
                                      ]}
                                  >
                                      all coffee  
                                  </Text>

                               </View>
                         </TouchableOpacity>

                        <TouchableOpacity
                                                        style={[
                                                     { width: '25%' },
                                  activeLink === 'machiato' && { backgroundColor: 'rgb(225, 171, 70)',borderRadius:6 },
                                ]}
                                  onPress={() => { setActiveLink('machiato'); fetchCoffeData('Machiato'); setsearch('Machiato')}}
                                 >

                              <View style={styles.coffelinks}>
                              <Text
                                          style={[
                                              { textAlign: 'center', fontWeight: 'bold', marginTop: 3 },
                                              (activeLink === 'machiato' || isDarkMode) && { color: 'white' },
                                          ]}
                                      >
                                          machiato
                                      </Text>
                             </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                                  style={[
                                    { width: '25%' },
                                    activeLink === 'latte' && { backgroundColor: 'rgb(225, 171, 70)',borderRadius:6 },
                                  ]}
                                  onPress={() => { setActiveLink('latte'); fetchCoffeData('Latte');setsearch('Latte') }}
                                    >
                          <View style={styles.coffelinks}>
                          <Text
                                      style={[
                                          { textAlign: 'center', fontWeight: 'bold', marginTop: 3 },
                                          (activeLink === 'latte' || isDarkMode) && { color: 'white' },
                                      ]}
                                  >
                                      latte
                                  </Text>
                         </View>
                   </TouchableOpacity>


                  <TouchableOpacity
                                  style={[
                                    { width: '25%' },
                                    activeLink === 'american' && { backgroundColor: 'rgb(225, 171, 70)',borderRadius:6 },
                                  ]}
                                     onPress={() => { setActiveLink('american'); fetchCoffeData('American');setsearch('American') }}
                              >
                         <View style={styles.coffelinks}>
                         <Text
                                  style={[
                                      { textAlign: 'center', fontWeight: 'bold', marginTop: 3 },
                                      (activeLink === 'american' || isDarkMode) && { color: 'white' },
                                  ]}
                              >
                                  american
                              </Text>
                         </View>
                 </TouchableOpacity>
          </View>
    



                  <View style={styles.newscroll}>
                     
          
                  <ScrollView
                              style={{ width: '100%', height: '100%', borderColor: 'green' }}
                              
                              showsVerticalScrollIndicator={false}
                            >

                                
                            {
                              (isfetchingcoffe||isfetchingcoffe) ?
                                      <View style={{marginTop:'40%'}}>

                                           
                                             <ActivityIndicator size={40} color="rgba(227, 171, 17, 0.815)" />
                                         
                                         </View>
                              :
                              <>
                                   {renderCoffeRows()}

                               </>

                            }
                                 
                                 
                                         
                                   
                             </ScrollView>
                   </View>
                   <View style={isDarkMode? styles.darkfooter:styles.footer}>
                     <Footer darkModeFromProps={isDarkMode}/>      
                   </View>



                             

       </KeyboardAvoidingView>
    

      </>)
  } 
  export default Home
