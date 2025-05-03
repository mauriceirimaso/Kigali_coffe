import React from 'react-native-gesture-handler';
    
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';


import styles from './src/style';



const backgroundimage =require('./assets/coffephotoes/background.png');




import Home from './src/Home';
import Trade from './src/Trade';


import Order from './src/Order';

import Completed from './src/Complete';
import Settings from './src/Settings';
import Login from './src/Login';
import Register from './src/Register';
import Profile from './src/Profile';

import Coffedata from './src/Coffedata';
import Page from './src/Page';




{/*
import Profile from './src/Profile';

import Trade from './src/Trade';
*/}




import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';



const Stack = createStackNavigator();

type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Order: { getId: any };
  Profile: undefined;
  Settings: undefined;
  Trade: undefined;
  Scroll: undefined;
  Login: undefined;
  Register: undefined;
  Completed: undefined;
  NewDone: any;
  Coffe:any;
  Page:any;
};

type MainscreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function App() {
  const { height, width } = Dimensions.get('window');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Mainscreen} options={{ headerShown: false }} />
        
       
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Trade" component={Trade} options={{ headerShown: false }} />
        
       
        <Stack.Screen name="Completed" component={Completed} options={{ headerShown: false }} />
        <Stack.Screen name="Page" component={Page} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        
        <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Coffedata" component={Coffedata} options={{ headerShown: false }} />


        


       



        {/*
         <Stack.Screen name="Done" component={Done} options={{ headerShown: false }} />
        
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="Trade" component={Trade} options={{ headerShown: false }} />
        <Stack.Screen name="Scroll" component={Scroll} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
         */}
       

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

interface MainscreenProps {
  navigation: MainscreenNavigationProp;
}

function Mainscreen({ navigation }: MainscreenProps) {
  return (
    <View style={styles.fullview}>
      <View style={styles.imagecontainer}>
        <ImageBackground source={backgroundimage} resizeMode='cover' style={styles.imgcontainer}>
          <View style={styles.textcontainer}>
            <Text style={styles.bodytext}>Fall In Love With</Text>
            <Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold', marginLeft: '12%', top: 0 }}>
              Coffee in Blissful
            </Text>
            <Text style={{ color: 'white', fontSize: 35, marginLeft: '30%', fontWeight: 'bold' }}>
              Delight!
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.lowerdiv}>
        <View style={styles.descript}>
          <Text style={styles.lowertext}>Welcome to our cozy coffee corner where</Text>
          <Text style={{ color: 'rgb(164, 155, 155)', marginLeft: '20%' }}>Every cup is delightful for you</Text>
        </View>
        <View style={styles.lowerlink}>
          <TouchableOpacity style={styles.lowerbutton} onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
