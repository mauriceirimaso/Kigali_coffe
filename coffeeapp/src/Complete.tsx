import styles  from './Donecss';
import Footer from './Footer';
const emojiimage =require('../assets/ordericons/note.png');
const doneimage =require('../assets/newordericons/done.png');
const blackdone =require('../assets/donephotoes/done.png');
import Trade from './Trade';
import  Home from './Home';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';




import axios from 'axios';


import { useState,useEffect } from 'react';


import { 
    SafeAreaView,
    Text, 
    Image,
    View,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';



const Completed=()=>
{
  const navigation = useNavigation() as any;
  const [activeButton, setActiveButton] = useState('viewOrders');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleViewOrders = () => {
        setActiveButton('viewOrders'); 
    };

    const handleContinueShopping = () => {
        setActiveButton('continueShopping'); 
    };
  
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
     <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'} />
          
       <View style={isDarkMode ? styles.darkgrandcontainer :   styles.grandcontainer}>

            <View style={styles.blackview}/>
              
           
            <View style={isDarkMode? styles.darklowerview :styles.lowerview}>
                   <View style={isDarkMode? styles.darksuccessphoto :styles.successphoto}>
                     {isDarkMode?
                      <Image source={blackdone} style={styles.donephoto}/>: 

                      <Image source={doneimage} style={styles.donephoto}/>
                      }
                     
                   </View>
                   <View style={styles.donetext}>
                      <Text style={{color:'green',fontWeight:'800',fontSize:16}}>Order Placed Successfully</Text>
                   </View>
                   <View style={styles.lowerdone}>
                      <Text style={isDarkMode? styles.darklowertext :styles.lowertext}>our coffeshop will call you to confirm the </Text>
                      <Text style={isDarkMode? styles.darksecondtext :styles.secondtext}>coffe from your prescription</Text>
                   </View>
                   <View style={styles.opacities}>
                     <TouchableOpacity     style={[ activeButton === 'viewOrders' ? styles.activeButton : styles.ordersubmit]} onPress={() => {  handleViewOrders();  navigation.navigate('Trade')     }} >
      
           
   
                     <Text style={[
                              activeButton === 'viewOrders' 
                                ? (isDarkMode ? styles.activeText  : styles.activeText)  
                                :styles.darkopacitytext,
                            ]}>
                                 View Orders
                        </Text>
                     </TouchableOpacity>
                     
                     <TouchableOpacity style={[ activeButton === 'continueShopping' ? styles.activeButton : styles.ordersubmit]}    onPress={() => { handleContinueShopping();  navigation.navigate('Home')    }}>
                           <Text style={isDarkMode? activeButton === 'continueShopping'? styles.activeText: styles.darkopacitytext:activeButton === 'continueShopping'? styles.activeText: styles.newtext}>
                                 Continue Shopping
                                </Text>
                     </TouchableOpacity>
                
                </View>
                    
            </View>

       </View>  
       <View style={isDarkMode? styles.darkfooter :styles.footer}>
          <Footer darkModeFromProps={isDarkMode}/>
       </View>    
       <View>
       </View> 
         
        </>
    );
}
export default Completed