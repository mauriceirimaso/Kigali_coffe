import styles from './Ordercss';
import Footer from './Footer';
const emojiimage =require('../assets/ordericons/note.png');
const coffeimage =require('../assets/productimages/coffe1.png');
const discount =require('../assets/ordericons/discount.png');
const wallet =require('../assets/ordericons/wallet.png');
import RNPickerSelect from 'react-native-picker-select';
const background =require('../assets/ordericons/background1.png');
const adress =require('../assets/ordericons/adress.png');
const coffephoto4 =require('../assets/productimages/coffe4.png');
const note =require('../assets/ordericons/note.png');
import Completed from './Complete';
import * as Location  from 'expo-location'

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RouteProp } from '@react-navigation/native';
const back=require('../assets/coffeicons/return.png');


import { useNavigation } from '@react-navigation/native';


import axios from 'axios';


import { useState,useEffect } from 'react';


import { 
    SafeAreaView,
    Text, 
    
    Image,
    Alert,
    View,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';


type OrderRouteParams = {
    Order: {
      getId: string;
    };
  };

 type Coffee = {
    id: number;
    coffekind: string;
    rating: number;
    coffename: string;
    coffetype: string;
    coffephoto: string;
    price: number;
};







  const Order = ({ route }: { route: RouteProp<OrderRouteParams, 'Order'> }) => 
    {
    const { getId } = route.params;
    console.log("welcome to my order");
    console.log("coffeid",getId);
    
    const navigation = useNavigation() as any;
    const next='>';
    
    const [Number, setNumber] = useState(1);

    const [activelink,setactivelink]=useState('deliver');
    const [isDarkMode, setIsDarkMode] = useState(false);

    
    const [userData, setUserData] = useState<{ balance: string }>({ balance: '' });

    const [productData, setProductData] = useState<Coffee | null>(null);


    const [location,setlocation]=useState();
    const [loading,setisloading]=useState(false);
    const [formattedAddress, setFormattedAddress] = useState<string | null>(null);
    const [ispurchasing,setispurchasing]=useState(false);



     

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



 
    useEffect(() => {
      const fetchLocationData = async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Please grant location permissions");
          return;
        }
  
        
        let currentLocation = await Location.getCurrentPositionAsync({}) as any;
        setlocation(currentLocation);
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



















   

    const handleAdd = () => {
      setNumber(prevNumber => prevNumber + 1);
      console.log("number",Number);
  };

  
  const handleReduce = () => {
        
    if (Number > 0) { 
        setNumber(prevNumber => prevNumber - 1);
        
    } else {
        
    }
};


// const baseURL = 'https://rendersmartcoffe.onrender.com'; 

const baseURL = 'http://localhost:8000/'; 


const [newOrderId, setNewOrderId] = useState(null); 
const [error, setError] = useState(null);

const fetchNewOrderId = async () => {
  try {
    const response = await fetch(`${baseURL}/api/latestorder/`);
    const data = await response.json();
    console.log("data",data);
    
    setNewOrderId(data.new_orderid); 
    setError(null); 
  } catch (err) {
    console.error("Error fetching new order ID:", err);
    setError("Failed to fetch new order ID"); 
  }
};



useEffect(() => {
  fetchNewOrderId();
  
}, []);   



    

useEffect(() => {
  const fetchProductData = async () => {
    try {
      
      const response = await fetch(`${baseURL}/api/getproduct/?id=${getId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        }
       
      });

      

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const data = await response.json();
      
      setProductData(data);
      console.log("data2",productData);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  fetchProductData();
}, [getId]);


useEffect(() => {
  console.log('Current product data in state:', productData); 
}, [productData]);
   

useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      setisloading(true);
      const response = await fetch(`${baseURL}/api/getuserdetails/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData({
          balance: data.balance,   
        });
        setisloading(false);
      } else {
        console.error('Error fetching user details:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchUserDetails();
}, []);


const updatebalance=async()=>
{
  try
  {
  
  const balanceresponse=await fetch(`${baseURL}/api/updatebalance/`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      balance:(productData.price*Number)
    }),
  });
  if (balanceresponse.ok)
  {
   fetchAndSubmitOrder();
  }
}catch(error)
{
  console.log('error','balance not updated successfully');
}
}




    
const fetchAndSubmitOrder = async () => {
  try {

    setispurchasing(true);
    const response = await fetch(`${baseURL}/api/latestorder/`);
    const data = await response.json();
    const orderId = data.new_orderid;


    const coffephoto1 = `${productData.coffephoto}`;
    console.log("coffe photo url", coffephoto1);


    

    const submitResponse = await fetch(`${baseURL}/api/recordorder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productname: productData.coffename,
        orderid: orderId,
        producttype: productData.coffekind,
        price: (productData.price) * Number,
        quantity: Number,
        coffephoto: coffephoto1,
      }),
    });

    if (submitResponse.ok) {
      
      const notificationResponse = await fetch(`${baseURL}/api/recordnotification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notiid: orderId,
          notitype: 'order',
          notiphoto: coffephoto1,
          balance:(productData.price) * Number,
        }),
      });

      if (notificationResponse.ok) {
        setispurchasing(false);
        navigation.navigate('Completed');  
      } else {
        Alert.alert('Error', 'Failed to submit notification. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Failed to submit order. Please try again.');
    }

  } catch (error) {
    Alert.alert('Error', 'An unexpected error occurred. Please try again.');
  }
};    


    

    
return (
  <>
<StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'} />
    
  <View style={isDarkMode?  styles.blackgrandcontainer : styles.grandcontainer}>

      
        
       
         
      

      

    <View style={isDarkMode? styles.darknewview :styles.newview}>
      
      

       
               <View style={styles.topheading}>
                   <TouchableOpacity style={styles.back} onPress={()=>{navigation.navigate('Home')}}>
                    {isDarkMode? 
                      <Icon
                      name="arrow-left"         
                      size={15}                
                      color="white"             
                      style={{
                          padding: 5,          
                          borderRadius: 50,      
                          
                      }}
                  />
                    :
                    <Image source={back} style={{width:'60%',height:'60%'}}/>}
                       
                   </TouchableOpacity>
                   <View style={styles.order}>
                      <Text style={isDarkMode? {fontWeight:'700',color:'white'} : {fontWeight:'700'}}>Order</Text>
                   </View>

               </View>

               <View style={styles.newlinks}>
                   <TouchableOpacity style={activelink === 'deliver' ? styles.firsttouch:styles.firsttouch2} onPress={()=>{setactivelink('deliver')}}>
                       <Text  style={isDarkMode? {color: activelink === 'deliver' ? 'white' : 'white', fontWeight: '300' }:{color: activelink === 'deliver' ? 'white' : 'black', fontWeight: '300' }}>Deliver</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={activelink ==='pick' ?    styles.firsttouch: styles.firsttouch2} onPress={()=>{setactivelink('pick')}}>
                         <Text style={isDarkMode?  {color: activelink === 'pick' ? 'white' : 'white',fontWeight:'300'}:{color: activelink === 'pick' ? 'white' : 'black',fontWeight:'300'}}>Pick up</Text>
                   </TouchableOpacity>
               </View>

               <View style={styles.adresstwo}>
                   <Text style={isDarkMode? {color:'white',fontWeight:'800',fontSize:17}: {color:'black',fontWeight:'800',fontSize:17}}>Delivery Adress</Text>
               </View>
               <View style={styles.loweradress}>
                    <Text style={isDarkMode? {color:'white',fontWeight:'600'}: {color:'black',fontWeight:'600'}}>Rwanda</Text>
               </View>
               <View style={styles.loweradress}>
                    <Text style={isDarkMode? {color:'white',fontWeight:'600',fontSize:11} :{color:'black',fontWeight:'600',fontSize:11}}>{formattedAddress} </Text>
               </View>





              <View style={styles.headingview}>
                  <TouchableOpacity style={styles.noteslink}>
                    <View style={styles.noteimage}>
                      <Image source={note} style={{width: '40%', height: '90%'}} />
                    </View>
                      <Text style={isDarkMode? styles.darkadress :styles.adress}>edit address</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.noteslink}>
                    <View style={styles.noteimage}>
                      <Image source={note} style={{width: '40%', height: '90%'}} />
                    </View>
                      <Text style={isDarkMode? styles.darkadress: styles.adress}>add note</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.coffeview}>
                  <View style={styles.coffephotoview}>
                  {productData && (
                     <Image source={{ uri:`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${productData.coffephoto}.png?t=2024-10-14T08%3A25%3A20.142Z`}}  style={{width: '100%', height: '100%',borderRadius:7}} /> 
                    )}
                  </View>
                  <View style={styles.middleview}>
                    {productData && (
                      <>
                       <Text style={isDarkMode? {fontWeight: '900', fontSize: 16,color:'white'} :{fontWeight: '900', fontSize: 16}}>{productData.coffename}</Text> 
                       <Text style={isDarkMode? {fontSize: 13, fontWeight: '800', color: 'rgb(202, 202, 196)'}: {fontSize: 13, fontWeight: '800', color: 'rgb(99, 91, 77)'}}>{productData.coffekind}</Text> 
                       </>
                        )}
                  </View>


                  <View style={styles.quantity}>
                      <TouchableOpacity style={styles.reduce} onPress={handleReduce}>
                          <Text style={isDarkMode? {fontWeight: '800',color:'white'} : {fontWeight: '800'}}>-</Text>
                      </TouchableOpacity>
                      <View style={styles.number}>
                          <Text style={isDarkMode? {fontWeight: '800',color:'white'}: {fontWeight: '800'}}>{Number}</Text>
                      </View>
                      <TouchableOpacity style={styles.add} onPress={handleAdd}>
                          <Text style={isDarkMode? {fontWeight: '800',color:'white'} :{fontWeight: '800'}}>+</Text>
                      </TouchableOpacity>
                  </View>



              </View>

              <View style={styles.discount}>
                  <View style={styles.firstdiscount}>
                      <Image source={discount} style={{width: '50%', height: '80%'}} />
                  </View>
                  <View style={styles.seconddiscount}>
                      <Text style={isDarkMode? {fontWeight: '800',fontSize:12,color:'white'} :{fontWeight: '800',fontSize:12}}>1 discount is applied</Text>
                  </View>
                  <TouchableOpacity style={styles.thirddiscount}>
                      <Text style={isDarkMode? {fontWeight: '800',color:'white'} :{fontWeight: '800'}}>{next}</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.payment}>
                  <View style={styles.paymentheading}>
                      <Text style={isDarkMode? {fontWeight: '700', fontSize: 17,color:'white'}: {fontWeight: '700', fontSize: 17}}>Payment details</Text>
                  </View>
                  <View style={styles.price1}>
                      <View style={styles.pricetext}>
                          <Text style={isDarkMode? {fontWeight: '700',color:'white'} :{fontWeight: '700'}}>price</Text>
                      </View>
                      <View style={styles.pricecontent}>
                          {productData && (
                            <Text style={isDarkMode? {fontWeight: '600',color:'white'} :{fontWeight: '600'}}>{(productData.price)*Number}$</Text> 
                          )}
                      </View>
                  </View>
                  <View style={styles.price}>
                      <View style={styles.pricetext2}>
                          <Text style={isDarkMode? {fontWeight: '700',color:'white'} :{fontWeight: '700'}}>delivery fee</Text>
                      </View>
                      <View style={styles.deliverycontent}>
                          <Text style={isDarkMode? {fontWeight: '600', textDecorationLine: 'line-through',color:'white'}: {fontWeight: '600', textDecorationLine: 'line-through'}}>2.1$</Text>
                          <Text style={isDarkMode? {fontWeight: '600',color:'white'} :{fontWeight: '600'}}>1.0$</Text>
                      </View>
                  </View>
              </View>

              <View style={styles.wallet}>
                  <View style={styles.walletimage}>
                      <Image source={wallet} style={{width: '50%', height: '50%'}} />
                  </View>
                  <View style={styles.middlewallet}>
                      <View style={styles.wallettype}>
                          <Text style={{fontWeight:'900',color:'grey'}}>Balance</Text>
                      </View>
                      {loading?
                       <View style={styles.wallettype3}>
                          <ActivityIndicator size={13} color="rgba(227, 171, 17, 0.815)" />
                       </View>
                      :
                      <View style={styles.wallettype}>
                          <Text style={{fontWeight: '700', color: 'rgb(228, 151, 18)'}}> ${parseFloat(userData.balance).toFixed(2)}.00</Text>
                      </View>
                       }
                  </View>
              </View>
              <View style={styles.ordersubmit}>

              {ispurchasing?
                  <TouchableOpacity  activeOpacity={1}  style={styles.touchablegreen}  onPress={() => {updatebalance(); setispurchasing(true) }}>

                   
                    <Text style={{fontWeight: '800', color: 'white', fontSize: 17}}>
                               IniTialiZing PurchasE...... 
                    </Text>
                 </TouchableOpacity>
                 :
                  <TouchableOpacity style={styles.touchable}  onPress={() => {updatebalance(); setispurchasing(true) }}>

                      <Text style={{fontWeight: '800', color: 'white', fontSize: 17}}>
                         Order 
                      </Text>
                  </TouchableOpacity>
                    }
                      
                 
              </View>
          </View>
          </View>
    
    
   
    
      <View style={isDarkMode? styles.darkfooter :styles.footer}>
          <Footer darkModeFromProps={isDarkMode} />
      </View>
  </>
);
}  

export default Order;
