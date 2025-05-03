import styles  from './Profilecss';
const profilephoto =require('../assets/profileicons/profilephoto.png');
const gold  =require('../assets/profileicons/gold.png');
const wallet =require('../assets/profileicons/wallet.png');
const pen =require('../assets/profileicons/pen.png');
const purchase1 =require('../assets/profileicons/purchase.png');
import Icon from 'react-native-vector-icons/FontAwesome';


const shop =require('../assets/purchaseicons/shop.png')


const newwallet =require('../assets/purchaseicons/pay.png');
const blackwallet =require('../assets/profileicons/blackwallet.png');
const blackshop =require('../assets/profileicons/blackshop.png');
const date =require('../assets/profileicons/date.png');
const receive =require('../assets/purchaseicons/receive.png');
const logout =require('../assets/profileicons/logout.png');
const rate =require('../assets/purchaseicons/rate.png');
const settings =require('../assets/profileicons/settings.png');
const notification =require('../assets/profileicons/notification.png');


const help =require('../assets/profileicons/help.png');
import AsyncStorage from '@react-native-async-storage/async-storage';



import Profilehistory from './Profilehistory';

import Purchase from './Purchase';

import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Pressable } from 'react-native';

// onPress={() => navigation.navigate('Home')}

 {/* <Purchase dispay='' image={newwallet} activity='to pay'/>
                               */}


                            //   onPress={() => navigation.navigate('Settings')}
                            // onPress={() => navigation.navigate('Login')}



const coffephoto1 =require('../assets/productimages/coffe1.png');
const coffephoto2 =require('../assets/productimages/coffe2.png');


const mtn=require('../assets/depositimages/mobile.png')
const failed=require('../assets/depositimages/cancel.png')
const success=require('../assets/depositimages/success.png')
const paypal=require('../assets/depositimages/paypal.png')

const back=require('../assets/depositimages/back.png')

const crypto=require('../assets/depositimages/crypto.png')
const rwanda=require('../assets/depositimages/rwanda.png')



import { 
    SafeAreaView,
    Text, 
    Image,
    View ,
    Platform,
    
    Modal,
    ImageBackground,
    Dimensions,
    Button,
    TouchableOpacity,
    ActivityIndicator,
  
     } from 'react-native';

     import Footer from './Footer';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
   


    interface UserDetails {
        profilephoto: string;
        fullnames: string;
        membership: string;
        balance:any;
      }

      interface Notification {
        id: any;
        notitype: 'order' | 're-order' | 'canceled' | 'deposit';
        notiphoto: any;
        date: any;
        time: any;
        notiid?: any;  
        notid?: any;
        balance:any;
      }


    export default function Profile()
    {

        const [userDetails, setUserDetails] = useState<UserDetails>({
            profilephoto: '',
            fullnames: '',
            membership: '',
            balance:'',
          });



             const [modalVisible, setModalVisible] = useState(false);
             const [secondmodel,setsecondmodel]=useState(false)
             const [issucess,setissucess]=useState(false);
             const [errmessage,seterrormessage]=useState(null);
             const [notificationmodel,setnotificationmodel]=useState(false);

             
             const [selectedView, setSelectedView] = useState(null);
             const [amount, setAmount] = useState('');
             const [isDarkMode, setIsDarkMode] = useState(true);
             const [isloading,setisloading]=useState(false);
             const [isfetchingpdata,setisfetchingpdata]=useState(false);


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



             const showModal = () => {
              setsecondmodel(true);
              setTimeout(() => {
                setsecondmodel(false);
              }, 3000); 
            };

          const baseurl = 'https://rendersmartcoffe.onrender.com';

          const navigation = useNavigation() as any;

          useEffect(() => {
            const fetchUserDetails = async () => {
              try {
                setisfetchingpdata(true)
                setisloading(true);
                const response = await fetch(`${baseurl}/api/getuserdetails/`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                const result = await response.json();
                console.log('Fetched user details:', result);
                setUserDetails(result);
                setisfetchingpdata(true);
                setisloading(false)
              } catch (error) {
                console.error('Error fetching user details:', error);
              }
            };
        
            fetchUserDetails();
          }, []);

    


          const [notifications, setNotifications] = useState<Notification[]>([]);
          const [isfetchingnotificatiion,setisfetchingnotification]=useState(false);

          useEffect(() => {
            const fetchUserNotification = async (): Promise<void> => {
              try {
                setisloading(true)
                setisfetchingnotification(true)
                const response = await fetch(`${baseurl}/api/notifications/`);
                const data: Notification[] = await response.json();
        
                if (response.ok) {
                  setNotifications(data);

                  setisloading(false)
                  setisfetchingnotification(false);
                } else {
                  console.error('Error fetching notifications:', data);
                }
              } catch (error) {
                console.error('Fetch error:', error);
              }
            };
        
            fetchUserNotification();
          }, []);





         






          const handleAddBalance = async () => {
            
            if (Number(amount) <= 1000) {
              setissucess(false);
              seterrormessage("The minimum deposit is 1000");
              showModal();
              setModalVisible(false);
              return; 
            }
          
            try {
             
              const response = await fetch(`${baseurl}/api/addbalance/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ balance: (Number(amount)/1300) }),
              });
          
              
              if (response.ok) {
                Alert.alert('Success', 'Deposited successfully!');
                setModalVisible(false);
                showModal();
                setissucess(true);
                
               
                const notificationResponse = await fetch(`${baseurl}/api/recordnotification/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    notiid: "DPST",          
                    notitype: "deposit",       
                    notiphoto: "deposit",
                    balance: Number(amount) ,
                  }),
                });
          
                
                if (!notificationResponse.ok) {
                  const notificationErrorData = await notificationResponse.json();
                  console.log('Notification Error', notificationErrorData.detail || 'Failed to record notification');
                }
          
              } else {
                const errorData = await response.json();
                console.log('Error', errorData.detail || 'Failed to add balance');
              }
            } catch (error) {
              console.error(error);
            }
          };
          
          


          const handleLogout = async () => {
            try {
              const response = await fetch(`${baseurl}/logout/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        
              if (response.ok) {
                Alert.alert('Success', 'Logout successful!');
                navigation.replace('Login'); 
              } else {
                const data = await response.json();
                
              }
            } catch (error) {
              
              console.error(error);
            }
          };


        return(<>
        


           
            <View style={isDarkMode? styles.darkgrandview :styles.grandview}>
                <View style={isDarkMode? styles.darkblackview :styles.blackview} >
     
                <View style={styles.account}>
                      <View style={styles.accountphoto}>
                         <Image source={profilephoto} style={{width:'90%',height:'90%'}}/>
                      </View>
                      <View style={styles.accounttext}>
                         <Text style={{color:'white',fontWeight:'800',fontSize:18}}>Account</Text>
                      </View>
                </View>
     
                   <View style={isDarkMode? styles.darkcrossview :styles.crossview}>
                     <View style={isDarkMode? styles.darkprofileview :styles.profileview}>
                         <View style={styles.profilepart}>
                          {
                            isfetchingpdata?
                            <View style={styles.photo}>
                                <ActivityIndicator size={26} color="rgba(227, 171, 17, 0.815)" />
                            </View>
                            :
                          
                            <View style={styles.photo}>
                                 <Image source={{ uri:`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/profilephotoes/${userDetails.profilephoto}.png?t=2024-10-24T09%3A11%3A16.613Z` }} 
                                 
                                 style={{width:'50%',height:'50%',borderRadius:40}} /> 
                            </View>
                                }
                            <TouchableOpacity style={styles.changephoto}>
                                <Image source={pen} style={{width:'80%',height:'80%'}}/>   
                            </TouchableOpacity>
                            <View style={styles.bio}>
     
                                <Text style={isDarkMode? {color:'white',fontSize:12,fontWeight:'800'} :{fontSize:12,fontWeight:'800'}}>{userDetails.fullnames}</Text> 
                               
                               <View style={styles.biographview}>
                                  <Image source={gold} style={{width:'20%',height:'100%'}}/>
                                  <Text style={{fontSize:11,color:'hsl(0, 1%, 62%)',fontWeight:'700'}}>{userDetails.membership}</Text> 
                               </View>
                            </View>
                         </View>
                         <View style={styles.profilepart2}>
                              <View style={styles.wallet}>
                                   <Image  source={wallet} style={{marginTop:'20%'}}/>
                                   <View style={styles.money}>
                                      <Text style={isDarkMode? {color:'white',fontWeight:'600',marginTop:'1%'}:{fontWeight:'600',marginTop:'1%'}}>Balance</Text>
                                       <Text style={{ color:'hsl(34, 86%, 46%)',fontWeight:'800',marginLeft:'10%'}}>${Math.floor(userDetails.balance)}.00</Text> 
                                   </View>
                              </View>
                         </View>
                     </View>
                     
                     
     
                      <View style={styles.lowerprofile}>
                           <TouchableOpacity  style={isDarkMode? styles.darkpurchase1 :styles.purchase1}>
                              <Text style={isDarkMode? {color:'rgb(216, 216, 209)',fontSize:13,fontWeight:'800'} :{fontSize:13,fontWeight:'800'}}>purchase</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={isDarkMode? styles.darkpurchase :styles.purchase}>
                              <Text style={isDarkMode?{color:'rgb(216, 216, 209)' ,fontSize:13,fontWeight:'800'} :{fontSize:13,fontWeight:'800'}}>edit </Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={isDarkMode? styles.darkpurchase :styles.purchase} onPress={() => setModalVisible(true)}>
                           <Text style={isDarkMode? {color:'rgb(216, 216, 209)',fontSize:13,fontWeight:'800'} :{fontSize:13,fontWeight:'800'}}>deposit</Text>
                           </TouchableOpacity>
                                   
                       </View>
                       <Modal
                                       animationType="fade" 
                                      transparent={true} 
                                       visible={modalVisible}
                                         onRequestClose={() => setModalVisible(false)} 
                                        >

                                      <Pressable style={isDarkMode? styles.darkpromptview :styles.promptview}>
                                          {!selectedView ? (
                                           <>
                                           
                                           <View style={styles.newdiv}>
                                             <View style={styles.topheading}>
                                                 <TouchableOpacity style={styles.backbutton} onPress={()=>{setModalVisible(false)}}>
                                                       <Icon name="arrow-left" size={17} color="white" /> 
                                                 </TouchableOpacity>
                                                  <Text style={{color:'white',fontWeight:'800'}}>Choose Method</Text>
                                             </View>
                                             <View style={styles.newview}>
                                             <TouchableOpacity style={styles.firstview} onPress={() => setSelectedView('MOMO')}>
                                                 <View style={styles.upperprompt}>
                                                    <Image source={mtn} style={{width:'100%',height:'100%'}}/>
                                                 </View>
                                                 <View style={styles.lowerprompt}>
                                                    <Text style={{fontWeight:'600',color:'white'}}>MOMO</Text>
                                                 </View>
                                             </TouchableOpacity>
                                             <TouchableOpacity style={styles.firstview}>
                                                  <View style={styles.upperprompt}>
                                                    <Image source={paypal} style={{width:'100%',height:'100%'}}/>
                                                    </View>
                                                   <View style={styles.lowerprompt}>
                                                    <Text style={{fontWeight:'600',color:'white'}}>PAYPAL</Text>
                                                 </View>
                                             </TouchableOpacity>
                                             <TouchableOpacity style={styles.firstview}>
                                                     <View style={styles.upperprompt}>
                                                    <Image source={crypto} style={{width:'100%',height:'100%'}}/>
                                                    </View>
                                                   <View style={styles.lowerprompt}>
                                                    <Text style={{fontWeight:'600',color:'white'}}>CRYPTO</Text>
                                                    </View>
                                            </TouchableOpacity>
                                            </View>
                                            
                                           </View>
                                           
                                           </>


                                       ) : (


                                        <View style={styles.momopay}>

                                         

                                      <View style={styles.lowerpart}>
                                           <View style={styles.heading}>
                                             <Image source={mtn} style={{width:'100%',height:'100%'}}/>
                                           </View>
                                           <View style={styles.phoneno}>
                                             <View style={styles.firstdiv}>
                                                <Image source={rwanda} style={{width:'100%',height:'100%',borderTopLeftRadius: 6, borderBottomLeftRadius: 6, }}/>
                                             </View>
                                             <View style={styles.seconddiv}>
                                                 <TextInput  placeholder='number' style={styles.notype}/>
                                             </View>
                                           </View>
                                           <View style={styles.amount}>
                                               <TextInput
                                                 placeholder='amount'
                                                  keyboardType="numeric"
                                                  value={amount}
                                                  onChangeText={setAmount} 
                                                  style={styles.notype2}/>
                                           </View>
                                           <View style={styles.opacity}>

                                          
                                           <TouchableOpacity style={styles.deposit} onPress={()=>{handleAddBalance()}}>
                                            <Text>deposit</Text>
                                           </TouchableOpacity>
                                           <TouchableOpacity style={styles.back} onPress={()=>{setSelectedView(null)}}>
                                              <Text style={{color:'white'}}>back</Text>
                                           </TouchableOpacity>

                                           </View>
                                        </View>
                                      </View>  
                                      )}
                                       </Pressable>
                                      
         
         
                                        
                                   </Modal>



                                   <Modal
                                       animationType="fade" 
                                      transparent={true} 
                                       visible={secondmodel}
                                         onRequestClose={() => setsecondmodel(false)} 
                                        >
                                        <View style={issucess?  styles.secondview:styles.failedsecondview }>
                                              {issucess?(
                                                <>
                                      
                                                      <Image source={success} style={{width:'10%',height:'40%',marginTop:'2%'}}/>

                                                       <Text style={{fontWeight:'800',color:'white'}}>success</Text>
                                                   
                                                    </>

                                                ):(
                                                  <>
                                                  
                                                      <Image source={failed} style={{width:'10%',height:'40%'}}/>
  
                                                  
                                                  
                                                       <Text style={{marginLeft:'2%',fontWeight:'600',fontSize:12,color:'white'}}>{errmessage}</Text>
                                                    
                                                    </>
                                                )}
                                        </View>
                                         


                                        </Modal>
                     
                   </View>
     
                   <Modal
                                       animationType="fade" 
                                      transparent={true} 
                                       visible={notificationmodel}
                                         onRequestClose={() => setnotificationmodel(false)} 
                                        >
                                            <View style={isDarkMode? styles.nmodel:styles.whitenmodel}>
                                                <View style={styles.notiheading}>
                                                   <TouchableOpacity onPress={()=>{setnotificationmodel(false)}}>
                                                      <Icon name="arrow-left" size={15} color={isDarkMode? "white": "black"} />
                                                  </TouchableOpacity>
                                                  <Text style={isDarkMode? {fontWeight:'700',color:'white',marginLeft:'4%'}:{fontWeight:'700',color:'black',marginLeft:'4%'}}>
                                                    Notifications
                                                  </Text>
                                                   <Icon name="bell" size={17} color={isDarkMode? "white":"black"} style={{marginLeft:'5%'}} />
                                                </View>
                                                
                                              <View  style={styles.scrollnoti}>
                                                <ScrollView style={styles.scroll3}>

                                                {notifications.map((notification) => {
                                            const { notitype, notiphoto, date, time, notiid, notid, id,balance } = notification;
                                        
                                            let orderText = '';
                                            switch (notitype) {
                                              case 'order':
                                                orderText = `The ${notitype} payment of your order: ${notiid} has been approved`;
                                                break;
                                              case 're-order':
                                                orderText = `The ${notitype} payment of your order: ${notiid} has been approved`;
                                                break;
                                              case 'canceled':
                                                orderText = `The  order: ${notiid} has been cancelled successfully`;
                                                break;
                                              case 'deposit':
                                                orderText =`deposited amount ${balance} successfully to your account`;
                                              default:
                                                break;
                                                return null;
                                            }
                                        
                                            return (
                                              <Profilehistory
                                                key={id}
                                                title={notitype}
                                                ordertext={orderText}
                                                image={`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${notiphoto}.png?t=2024-10-24T13%3A18%3A28.383Z`}
                                                date={date}
                                                hour={time}
                                                favourite={true}
                                              />
                                            );
                                          })}
                                                               
                                                </ScrollView>
                                              </View>
                                            </View>

                                           








                                          </Modal>
     
                   
                   
                </View>
                <View style={styles.scrollview}>
     
     
                     <View style={isDarkMode? styles.darkmypurchase:styles.mypurchase}>
                          <View style={styles.purchaseheading}>
                              <Image style={{height:'60%',marginLeft:18}} source={purchase1}/>
                               <Text style={isDarkMode?  {color:'white',fontWeight:'800',marginLeft:'2%'}:{fontWeight:'800',marginLeft:'2%'}}>My Purchase</Text>
                               <TouchableOpacity style={styles.purchaselink}>
                                  {/* <Text style={{fontWeight:'700',fontSize:11,marginRight:17}}>{purchase}</Text> */}
                               </TouchableOpacity>
                           </View>
     
                           <View style={styles.secondpurchase}>
                               <Purchase display='none' image={newwallet} activity='to pay'/>
                               <Purchase display='none' image={shop} activity='to shop'/>
                               <Purchase display='' image={receive} activity='receive'/>
                               <Purchase display='none' image={rate} activity='to rate'/>
                             
                           </View>
                           
                     </View>
               
                     <TouchableOpacity style={isDarkMode? styles.darknotification :styles.notification} onPress={()=>{setnotificationmodel(true)}}>
                         <View style={styles.notificationheading}>
                             <Text style={isDarkMode? {color:'white',fontWeight:'800',marginLeft:'4%'}:{color:'black',fontWeight:'800',marginLeft:'4%'}}>Notifications</Text>
                             {isDarkMode? 
                                    <Icon name="bell" size={15} color="white" style={{marginLeft:'63%'}} />
                             :
                                   <Image style={{marginLeft:'63%'}} source={notification}/>
                             }
                             
                         </View>
                         {isfetchingnotificatiion?
                         
                            <View style={{marginTop:'5%'}}>
                               <ActivityIndicator size={40} color="rgba(227, 171, 17, 0.815)" />
                            </View>
                         :
                        
                        
                         <View style={styles.recentview}>
                             <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',height:'100%'}}>
                              
                             
                                          {notifications.map((notification) => {
                                            const { notitype, notiphoto, date, time, notiid, notid, id,balance } = notification;
                                        
                                            let orderText = '';
                                            switch (notitype) {
                                              case 'order':
                                                orderText = `The ${notitype} payment of your order: ${notiid} has been approved`;
                                                break;
                                              case 're-order':
                                                orderText = `The ${notitype} payment of your order: ${notiid} has been approved`;
                                                break;
                                              case 'canceled':
                                                orderText = `The  order: ${notiid} has been cancelled successfully`;
                                                break;
                                              case 'deposit':
                                                orderText =`deposited amount ${balance} successfully to your account`;
                                              default:
                                                break;
                                                return null;
                                            }
                                        
                                            return (
                                              <Profilehistory
                                                key={id}
                                                title={notitype}
                                                ordertext={orderText}
                                                image={`https://wjowopzpnijescsqynza.supabase.co/storage/v1/object/public/media/coffephotoes/${notiphoto}.png?t=2024-10-24T13%3A18%3A28.383Z`}
                                                date={date}
                                                hour={time}
                                                favourite={false}
                                              />
                                            );
                                          })}
                                       
                                                                         
                              
                             </ScrollView>

                       </View>
                             }
                     </TouchableOpacity>
     
                     <View style={styles.more}>
                         <View style={styles.innerabout}>
                              <TouchableOpacity   style={{width:'30%',height:'100%',flexDirection:'row',borderColor:'red',alignItems:'center',justifyContent:'center'}}>
                                 <Image source={settings} style={{width:'20%',height:'100%'}}/>
                                 <Text style={{fontSize:11,fontWeight:'700',marginLeft:'3%'}}>profile settings</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{width:'30%',height:'100%',flexDirection:'row',borderColor:'red',alignItems:'center',justifyContent:'center'}}>
                                 <Image source={help} style={{width:'20%',height:'100%'}}/>
                                 <Text style={{fontSize:11,fontWeight:'700',marginLeft:'3%'}}>help  center</Text>
                              </TouchableOpacity>
                              <TouchableOpacity    style={{width:'30%',height:'100%',flexDirection:'row',borderColor:'red',alignItems:'center',justifyContent:'center'}}
                                onPress={()=>handleLogout()}>
                                 <Image source={logout} style={{width:'20%',height:'100%'}}/>
                                 <Text style={{fontSize:11,fontWeight:'700',marginLeft:'3%'}}>Logout</Text>
                              </TouchableOpacity>
                         </View>
                     </View>
                </View>
                
            </View>
            
            <View style={isDarkMode? styles.darkfooter :styles.footer}>
                  <Footer darkModeFromProps={isDarkMode}/>
             </View>
     
     
             </>)

    }

