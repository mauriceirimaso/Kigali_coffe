import styles from './Emptycss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';

import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    ImageBackground,
    TextInput,
    Dimensions,
    StatusBar,
    Button,
    TouchableOpacity,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
  
     } from 'react-native';

const  empty =require('../assets/Empty/empty.png');
function Emptysearch(props)
{
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


   return(<>
           <KeyboardAvoidingView>
             <View style={styles.upperphoto}>
               <Image source={empty} style={{width:'70%',height:'70%'}}></Image>
             </View>
             <View style={styles.lowertext}>
                <Text style={isDarkMode? {color:'white'} :styles.lowerpara}>No search Found </Text>
             </View>
             
           </KeyboardAvoidingView>

         </>)
}
export default Emptysearch