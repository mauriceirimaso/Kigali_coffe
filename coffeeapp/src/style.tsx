
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    fullview:
    {
        width:'100%',
        height:'100%',
        backgroundColor:'yellow',
        borderWidth:2,
        
    },
    imagecontainer:
    {
        width:'100%',
        height:'70%',
        borderWidth:2,
        
        
        flex:1,
        flexDirection:'column-reverse',
    },
    imgcontainer:
    {
        width:'100%',
        height:'100%',
        flex:1,
        flexDirection:'column-reverse',
    },
    lowerdiv:
    {
       backgroundColor:'black',
       width:'100%',
       height:'30%',
       
       
       
    },
    textcontainer:
    {
        width:'100%',
        height:'27%',
        
        
        
        
    },
    bodytext:
    {
        color:'white',
        fontWeight:'bold',
        fontSize:35,
        marginLeft:'13%',
        marginRight:'3%',

    },
    descript:
    {
        width:'100%',
        borderWidth:2,
        
        height:'auto',
        top:18,
    },
    lowertext:
    {
        color:'rgb(164, 155, 155)',
        fontSize:17,
        marginLeft:'7%',
    },
    lowerlink:
    {
       borderWidth:2,
       
       top:55,
       height:'30%',
       justifyContent:'center',
       alignItems:'center',
    },
    lowerbutton:
    {
        width: 350,
        height: 60,
        backgroundColor: 'rgb(155, 105, 78)',
        borderRadius: 20,
        marginTop: 0,
        
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // Shadow for Android
      
    }

    
    
});
export default styles;