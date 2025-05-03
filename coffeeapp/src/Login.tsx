import styles from './Logincss';
import { useState } from 'react';
import axios from 'axios';
import Home from './Home';



import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const view = require('../assets/loginicons/view.png');
const twitter = require('../assets/loginicons/twitter.png');
const apple = require('../assets/loginicons/apple.png');
const google = require('../assets/loginicons/google.png');

import { useEffect } from 'react';

import Register from './Register';

import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigation = useNavigation() as any;

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



 const baseURL='http://127.0.0.1:8000';
 //'https://rendersmartcoffe.onrender.com/api/login/'
  

  
  const handleLogin = async () => {
    console.log('Login Attempt:', { email, password });
  
    try {
      const response = await axios.post(baseURL
        ,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Login successful, navigating to Home');
        navigation.navigate('Home');
        Alert.alert('Login successful', '', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        console.log('Login failed:', response.data);
        setErrorMessage(response.data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Login failed.');
      } else {
        setErrorMessage('Login failed. Please try again later.');
      }
    }
  };
  

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };
  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(28, 27, 27)" />
      <View style={isDarkMode? styles.darkgrandview :styles.grandview}>
        <View style={isDarkMode? styles.darkblackview:styles.blackview}>
          <View style={styles.loginview}>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 20 }}>Login</Text>
          </View>
          <View style={isDarkMode? styles.darkcrossview:styles.crossview}>
            <View style={styles.centre}>
              <View style={styles.loginheading}>
                <Text style={isDarkMode? { color: 'white', fontWeight: '600', marginLeft: '2%' }:{ color: 'black', fontWeight: '600', marginLeft: '2%' }}>
                  Login to your existing account
                </Text>
              </View>
              <View style={styles.twodiv1}>
                <Text style={isDarkMode? { color: 'white', fontWeight: '800', marginLeft: '2%' }:{ color: 'black', fontWeight: '800', marginLeft: '2%' }}>Email</Text>
              </View>
              <TextInput
                style={styles.password}
                value={email}
                onChangeText={(text) => {
                  console.log('Email entered:', text);
                  setEmail(text);
                }}
                keyboardType="email-address"
              />
              <View style={styles.username}>
                <Text style={isDarkMode? { color: 'white', fontWeight: '800', marginLeft: '2%' } :{ color: 'black', fontWeight: '800', marginLeft: '2%' }}>Password</Text>
              </View>
              <View style={styles.twodiv}>
                <TextInput
                  secureTextEntry={!isPasswordVisible}
                  style={styles.email}
                  value={password}
                  onChangeText={(text) => {
                    console.log('Password entered:', text);
                    setPassword(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.viewlink}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Image style={{ width: '80%', height: '80%' }} source={view} />
                </TouchableOpacity>
              </View>
              <View style={styles.rememberme}>
                <TouchableOpacity style={styles.forget}>
                  <Text style={{ color:isDarkMode? 'rgb(12, 114, 15)': 'blue' }}>Forget password</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.loginlink} onPress={handleLogin}>
                <Text style={{ fontWeight: '900' }}>LOGIN</Text>
              </TouchableOpacity>
              <View style={styles.newtextlink}>
                <Text style={{ marginTop: '-1%', color: 'red' }}>{errorMessage}</Text>
              </View>
              <View style={styles.signup}>
                <Text style={isDarkMode?{color:'white'}: {}}>Don't have an account?</Text>
                <TouchableOpacity style={styles.lastlink2} onPress={()=>navigateToRegister()} >
                  <Text style={{ color:isDarkMode? 'rgb(12, 114, 15)' : 'blue' }}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.textor}>
                <View style={styles.oneview} />
                <Text style={isDarkMode? { color:'white',fontWeight: '900' }:{ fontWeight: '900' }}>OR</Text>
                <View style={styles.oneview} />
              </View>
              <View style={styles.loginlinks}>
                <View style={styles.newlast}>
                  <TouchableOpacity style={styles.google}>
                    <Image style={{ width: '50%', height: '50%' }} source={google} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.google2}>
                    <Image style={{ width: '110%', height: '110%' }} source={twitter} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.google1}>
                    <Image style={{ width: '70%', height: '70%' }} source={apple} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default Login;
