
import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Coffecss'
import Footer from './Footer';

import {
    SafeAreaView,
    Text,
    View,
    ImageBackground,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
    Button,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';


interface Coffee {
    id: number;
    coffekind: string;
    rating: number;
    coffename: string;
    coffetype: string;
    coffephoto: string;
    price: number;
    descr: string;
    ratingnumber: number;
}

import { useNavigation } from '@react-navigation/native';

const coffe2 =require('../assets/productimages/coffe1.png');

const coffe=require('../assets/coffeicons/coffe.png');
const favourite=require('../assets/coffeicons/favourite.png');
const milk=require('../assets/coffeicons/milk.png');
const order=require('../assets/coffeicons/order.png');
const star=require('../assets/coffeicons/star.png');
const back=require('../assets/coffeicons/return.png');



interface Params {
    getId: any;
}


interface CoffedataProps {
    route: RouteProp<{ params: Params }, 'params'>;
}

const Coffedata: React.FC<CoffedataProps> = ({ route }) => {

     const baseURL = 'https://rendersmartcoffe.onrender.com';

    // const baseURL = 'http://localhost:8000/';
    const { getId } = route.params; 
    const [productData, setProductData] = useState<Coffee | null>(null);
    const [size,setsize]=useState('M');
    const [visible,setvisible]=useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isloading,setisloading]=useState(false);
    


     

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
      
      const navigation = useNavigation() as any;



    const fetchProductData = async () => {
        try {
          setisloading(true);
            const response = await fetch(`${baseURL}/api/getproduct/?id=${getId}`); 

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }

            const data: Coffee = await response.json();
            setProductData(data);
            setisloading(false);
        } catch (err) {
            console.error("Error in fetchProductData:", err);
            setisloading(true);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

     

    const n='<';
    
    return(<>
        <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'}  />
        <View style={isDarkMode? styles.darkgrandview : styles.grandview}>

        <View style={isDarkMode? styles.darkmajorview :styles.majorview}>
         <View style={styles.heading}>
     
             <TouchableOpacity style={styles.back} onPress={()=>{navigation.navigate('Home')}}>
              {isDarkMode? 
                <Icon
                name="arrow-left"         
                size={15}                
                color="white"            
                style={{
                    padding: 5,          
                         
                    backgroundColor: 'transparent', 
                }}
            />:
            <Image source={back} style={{width:'40%',height:'40%'}}/> 
            }
                
             </TouchableOpacity>
     
             <View style={styles.header}>
                <Text style={isDarkMode?{fontSize:15,fontWeight:'800',color:'white'} :{fontSize:15,fontWeight:'800'}}>Details</Text>
             </View>
     
             <TouchableOpacity style={styles.favourite}>
              {isDarkMode? 
                   <Icon
                   name="heart-o"    
                   size={25}                 
                   color="white"               
                   style={{
                        
                       padding: 5,                      
                       borderRadius: 50,                
                   }}
               />:
               <Image source={favourite} style={{width:'80%',height:'60%'}}/>
               }
                  
             </TouchableOpacity>
            
         
         </View>
         
         
        {isloading?

                <View style={styles.photo}>
                     <ActivityIndicator size={40} color="rgba(227, 171, 17, 0.815)" style={{marginTop:'20%'}} />
                     
                </View>
         :
         
         <View style={styles.photo}>

        
             
             <>
             {productData && (
              <Image source={{uri:`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${productData.coffephoto}.png?t=2024-11-01T16%3A31%3A03.305Z`}} style={{width:'100%',height:'100%',borderRadius:17}}/>
                )} 
            </>
         
            
         </View>
         }
         <View style={styles.topheading}>
              {productData && (
                 <Text style={isDarkMode? {fontWeight:'900',fontSize:20,color:'white'}:{fontWeight:'900',fontSize:20}}>{productData.coffename}</Text>
              )} 
         </View>
         <View style={styles.content}>
             <View style={styles.content1}>
                <Text style={isDarkMode?{marginBottom:'0.3%',color:'white'} :{marginBottom:'0.3%'}}>ice/hot</Text>
             </View>
             <View style={styles.image1}>
                  <Image source={order} style={{width:'40%',height:'80%'}}/>
             </View>
             <View style={styles.image1}>
                  <Image source={coffe} style={{width:'40%',height:'80%'}}/>
             </View>
             <View style={styles.image1}>
                 <Image source={milk} style={{width:'40%',height:'80%'}}/>
             </View>
         </View>
         <View style={styles.rating}>
              <View style={styles.star}>
                  <Image source={star}  style={{width:'50%',height:'70%'}}/>
              </View>
              <View style={styles.number}>
     
                {productData && (
              <Text style={isDarkMode? {fontWeight:'900',color:'white'}:{fontWeight:'900'}}>{productData.rating}</Text> 
                 )}
     
              </View>
              <View style={styles.bracket}>
               {productData && (
                  <Text style={isDarkMode? {color:'white'} :{color:'black'}}>({productData.ratingnumber})</Text>
              )} 
              </View>
         </View>
         <View style={styles.subheading}>
             <Text style={isDarkMode? {color:'white' ,fontWeight:'900',fontSize:18}:{fontWeight:'900',fontSize:18}}>Description</Text>
         </View>

         {isloading?
           <View style={visible ? styles.descr2 : styles.descr}>

              <ActivityIndicator 
                      size={30}      style={{marginTop:'15%'}}
                      color="rgb(201, 138, 21)"  
                  />
           </View>
             :

         <View style={visible ? styles.descr2 : styles.descr}>
          {productData && (
             <>

             <Text style={isDarkMode? {color:'rgb(176, 176, 169)'} :{color:'rgb(74, 74, 73)'}}>
                       {visible ? productData.descr.substring(0, 625) : productData.descr.substring(0, 300)} 
             </Text>
             <TouchableOpacity onPress={() => setvisible(!visible)}>
                    <Text style={{ color: 'rgb(178, 119, 11)', fontWeight: '900' }}>
                      {visible ? 'See Less' : 'Read More'}
                    </Text>
           </TouchableOpacity>
           </>
          )}
      
         </View>
         }
     
         <View style={visible ? {display:'none'}:styles.sizeheading}>
            <Text style={isDarkMode? {fontWeight:'900',fontSize:19,color:'white'}:{fontWeight:'900',fontSize:19}}>size</Text>
         </View>
     
         <View  style={visible ? {display:'none'}:styles.sizes}>
                  <TouchableOpacity
                    style={[styles.size, size === 'S' && styles.sizeh]}
                    onPress={() => setsize('S')}
                  >
                    <Text style={isDarkMode? size === 'S' ? styles.activetext : {color:'white'} : size === 'S' ? styles.activetext : styles.inactiveText}>S</Text>
                  </TouchableOpacity>
            
                  <TouchableOpacity
                    style={[styles.size, size === 'M' && styles.sizeh]}
                    onPress={() => setsize('M')}
                  >
                    <Text style={isDarkMode? size === 'M' ? styles.activetext : {color:'white'} :size === 'M' ? styles.activetext : styles.inactiveText}>M</Text>
                  </TouchableOpacity>
            
                  <TouchableOpacity
                    style={[styles.size, size === 'L' && styles.sizeh]}  
                    onPress={() => setsize('L')}
                  >
                    <Text style={isDarkMode? size === 'L' ? styles.activetext : {color:'white'}:size === 'L' ? styles.activetext : styles.inactiveText}>L</Text>
                  </TouchableOpacity>
     
         </View>
         <View style={styles.price}>
              <View style={styles.part1}>
                 <View style={styles.upperview1}>
                      <Text style={isDarkMode? {fontWeight:'400',color:'white'}:{fontWeight:'400'}}>price</Text>
                 </View>
                 <View style={styles.upperview}>
                    {productData && (
                      <Text style={{color:'rgb(178, 119, 11)',fontWeight:'900',fontSize:17}}>${productData.price}</Text>
                   )} 
                 </View>
     
              </View>
              {
                 isloading?  
                
               <TouchableOpacity disabled={true} style={styles.part22} onPress={()=>{navigation.navigate('Order', { getId })}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Buy Now</Text>
               </TouchableOpacity>
                 :
                 
                 <TouchableOpacity style={styles.part2} onPress={()=>{navigation.navigate('Order', { getId })}}>
                   <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Buy Now</Text>
                 </TouchableOpacity>
                
              }
             
         </View>
     
     
        </View>
        <View style={isDarkMode? styles.darkfooter :styles.footer}>
           <Footer darkModeFromProps={isDarkMode}/>
        </View>
        </View>
             </>)
};

export default Coffedata;
