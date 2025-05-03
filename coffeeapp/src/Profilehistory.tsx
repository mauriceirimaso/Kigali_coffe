import styles from './Profilecss';
import pen from '../assets/profileicons/pen.png';
import coffephoto1 from '../assets/productimages/coffe1.png';
import coffephoto2 from '../assets/productimages/coffe2.png';
const date1 =require('../assets/profileicons/blackdate.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from 'react';

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

function Profilehistory(props)
{

    const {image,title,favourite,ordertype,orderid,ordertext,orderstatus,date,hour}=props
    let gettitle=title;
    let getordertext=ordertext;
    let getdate=`${date}  ${hour}`;
    let getimage=image;
    let getfavourite=favourite;

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


    console.log("got image in profilehistory",getimage);
    return(<>
              <TouchableOpacity style={styles.recent}>
                        <View style={styles.recentphoto}>
                             <Image source={{uri:getimage}} style={{width:'60%',height:'60%',borderRadius:12}}/>  
                        </View>
                        <View style={styles.recenthistory}>
                           <Text style={isDarkMode?{color:'white',fontWeight:'900',marginLeft:'2%'}  :{fontWeight:'900',marginLeft:'2%'}}>{gettitle}</Text>
                           <Text style={isDarkMode? {color:'rgb(233, 233, 225)',fontWeight:'800',marginLeft:'2%',fontSize:12} :{color:'hsl(60, 1%, 24%)',fontWeight:'800',marginLeft:'2%',fontSize:12}}>{getordertext}</Text>
                           <View style={styles.innerview}>
                              {isDarkMode? 
                                   <Icon name="calendar" size={14} color="blue" style={{marginRight:'4%',marginTop:'2%'}}/>
                               :
                              <Image source={date1}/>}
                              
                              <Text style={isDarkMode? {fontWeight:'800',color:getfavourite? 'rgba(2, 24, 45, 0.815)':'white'} :{fontWeight:'800',color:'hsl(60, 2%, 12%)'}}>{getdate}</Text>
                           </View>
                        </View>
                        {getfavourite?
                             <View style={styles.favourite}>
                                <TouchableOpacity style={styles.upperview}>
                                <Icon 
                                       name="heart"  
                                       size={15}    
                                       color="white" 
                                       style={{backgroundColor:'transparent'}}
                                     />       
                                </TouchableOpacity>
                                <View style={styles.number}>
                                       <Text></Text>
                                </View>
                             </View>
                        :
                           null
                        }        
                </TouchableOpacity>
         </>)
}
export default Profilehistory