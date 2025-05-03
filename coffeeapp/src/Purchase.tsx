import React from 'react';
import { 
    SafeAreaView,
    Text, 
    Image,
    View,
    ImageBackground,
    Dimensions,
    Button,
    TouchableOpacity,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
} from 'react-native';
import styles from './Profilecss';
import { useState,useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define props interface
interface PurchaseProps {
    display: any;
    image: any;
    activity: any;
}

const Purchase: React.FC<PurchaseProps> = (props) => {
    const { display, image, activity } = props;

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

    return (
        <>
            <TouchableOpacity style={styles.purchasecontent}>
                <Image 
                    style={{ width: '40%', height: '40%' }} 
                    source={image} 
                />
                <View 
                    style={{
                        borderWidth: 1,
                        borderColor: 'red',
                        width: '10%',
                        height: '13%',
                        marginLeft: '40%',
                        marginTop: '-30%',
                        backgroundColor: 'red',
                        borderRadius: 50,
                    }} 
                />
                <Text 
                    style={isDarkMode? {color:'white',fontSize: 12, marginTop: 20, fontWeight: '700' } :{ fontSize: 12, marginTop: 20, fontWeight: '700' }}
                >
                    {activity}
                </Text>
            </TouchableOpacity>
        </>
    );
};

export default Purchase;
