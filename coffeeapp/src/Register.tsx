import styles from './Signupcss';
import Login from './Login';
import { useState } from 'react';
const view =require('../assets/loginicons/view.png');
import { useNavigation } from '@react-navigation/native';
import { 
    StatusBar,
    KeyboardAvoidingView,
    Text, 
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

function Register() {
    const [email, setemail] = useState('');
    const [fullnames, setfullnames] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation() as any;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkEmailAvailability = async () => {
        const response = await fetch('https://rendersmartcoffe.onrender.com/check_email_availability/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return response.json();
    };

    const handlesignup = async () => {
        setErrorMessage('');

        if (email.trim() === '') {
            setErrorMessage('Email field cannot be empty');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        if (password !== repassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Check email availability
        const emailCheckResult = await checkEmailAvailability();
        if (!emailCheckResult.available) {
            setErrorMessage(emailCheckResult.message || 'Email is already registered');
            return;
        }

        // Prepare form data
        const formdata = {
            fullnames,
            email,
            password,
        };

        // Send form data to the backend
        fetch('http://127.0.0.1:8000/signup/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => { throw data; });
            }
        })
        .then((data) => {
            console.log('Response Data:', data);
            Alert.alert('Success', 'User registered successfully');
            navigation.navigate('Login');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Registration failed. Please try again.');
        });
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={'rgb(28, 27, 27)'} />
            <KeyboardAvoidingView style={styles.grandview}>
                <View style={styles.blackview}>
                    <View style={styles.loginview}>
                        <Text style={{ color: 'white', fontWeight: '800', fontSize: 20 }}>Sign Up</Text>
                    </View>
                    <View style={styles.crossview}>
                        <View style={styles.centre}>
                            <View style={styles.loginheading}>
                                <Text style={{ color: 'black', fontWeight: '600', marginLeft: '2%' }}>Create your new account</Text>
                            </View>

                            {/* Full names */}
                            <View style={styles.twodiv1}>
                                <Text style={{ color: 'black', fontWeight: '800', marginLeft: '2%' }}>Full Names</Text>
                            </View>
                            <TextInput value={fullnames} onChangeText={setfullnames} style={styles.password} />

                            {/* Email */}
                            <View style={styles.twodiv1}>
                                <Text style={{ color: 'black', fontWeight: '800', marginLeft: '2%' }}>Email</Text>
                            </View>
                            <TextInput value={email} onChangeText={setemail} style={styles.password} />

                            {/* Password */}
                            <View style={styles.username}>
                                <Text style={{ color: 'black', fontWeight: '800', marginLeft: '2%' }}>Password</Text>
                            </View>  
                            <View style={styles.twodiv}>
                                <TextInput value={password} onChangeText={setpassword} secureTextEntry={true} style={styles.email} />
                                <TouchableOpacity style={styles.viewlink}>
                                    <Image style={{ width: '90%', height: '50%' }} source={view} />
                                </TouchableOpacity>
                            </View>  

                            {/* Re-enter password */}
                            <View style={styles.username}>
                                <Text style={{ color: 'black', fontWeight: '800', marginLeft: '2%' }}>Re-enter Password</Text>
                            </View>  
                            <View style={styles.twodiv}>
                                <TextInput value={repassword} onChangeText={setrepassword} secureTextEntry={true} style={styles.email} />
                                <TouchableOpacity style={styles.viewlink}>
                                    <Image style={{ width: '90%', height: '50%' }} source={view} />
                                </TouchableOpacity>
                            </View>  

                            {/* Sign up button */}
                            <TouchableOpacity onPress={handlesignup} style={styles.loginlink}>
                                <Text style={{ fontWeight: '900' }}>SIGN UP</Text>
                            </TouchableOpacity>

                            {/* Error message */}
                            <View style={styles.messageinfo}>
                                <Text style={{ color: 'red', marginLeft: '3%' }}>{errorMessage}</Text> 
                            </View>

                            {/* Login link */}
                            <View style={styles.signup}>
                                <Text>Already registered?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.lastlink2}>
                                    <Text style={{ color: 'blue' }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

export default Register;
