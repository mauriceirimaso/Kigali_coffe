import { StyleSheet } from "react-native"
const styles=StyleSheet.create({
    grandcontainer:
    {
      
      
      backgroundColor:'rgb(202, 192, 192)',
      borderColor:'red', 
      
      width:'100%',
      height:'93%',
     
    },
    darkgrandcontainer:
    {
      backgroundColor:'rgb(52, 52, 49)',
      borderColor:'red', 
      
      width:'100%',
      height:'93%', 
    },
    blackview:
  {
    
    borderColor:'red', 
    height:'25%',
    backgroundColor:'rgb(28, 27, 27)'
  },
  lowerview:
  {
    
    borderColor:'red',
    width:'80%',
    height:'60%',
    marginLeft:'10%',
    marginTop:'10%',
    backgroundColor:'white',
    borderRadius:10,
  },
  darklowerview:
  {
    
    borderColor:'red',
    width:'80%',
    height:'70%',
    marginLeft:'10%',
    marginTop:'5%',
    backgroundColor:'rgb(25, 25, 24)',
    borderRadius:20,
  },
  donephoto:
  {
    width:'100%',
    height:'100%',
    
  },
  blackdonephoto:
  {
    width:'50%',
    height:'50%',
    borderRadius:50,
    
  },
  darkfooter:
  {
    
    borderColor:'red',
    flex:1,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
  
  footer:
  {
    
    borderColor:'red',
    flex:1,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  successphoto:
  { 
      
      borderColor:'red',
      width:'60%',
      marginLeft:'20%',
      height:'40%',
      marginTop:'6%',
      justifyContent:'center',
      alignItems:'center',
      
      
      
  },
  darksuccessphoto:
  { 
      
      borderColor:'red',
      width:'60%',
      marginLeft:'20%',
      height:'40%',
      marginTop:'6%',
      justifyContent:'flex-end',
      alignItems:'center',
      
      
      
  },
  donetext:
  {
    
    borderColor:'red',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'3%'
  },
  opacitytext:
  {
    color:'black',
    fontWeight:'800'
  },
  newtext:
  {
    color:'black',
    fontWeight:'800',
  },
  darkopacitytext:
  {
    color:'white',
    fontWeight:'800',

  },

  lowerdone:
  { 
    
    borderColor:'red',
    height:'10%',
    
    
  },
  secondtext:
  {
     marginLeft:'23%',
     fontWeight:'500'
  },
  darksecondtext:
  {
     marginLeft:'23%',
     fontWeight:'500',
     color:'rgb(141, 141, 134)'
  },
  lowertext:
  {
    marginLeft:'10%',
    color:'black',
    fontWeight:'500'
  },
  darklowertext:
  {
    marginLeft:'10%',
    color:'rgb(141, 141, 134)',
    fontWeight:'500',
  },
  opacities:
  {

   
    borderColor:'green',
    
    height:'23%',
    width:'87%',
    marginLeft:'6.5%',
    marginTop:'7%',
    justifyContent:'space-around',
    
  },
  ordersubmit:
  {
    borderWidth:1,
    borderColor:'hsl(28, 83%, 46%)',
    borderRadius:12,
    height:'43%',
    width:'100%',

    justifyContent:'center',
    alignItems:'center',
    
    
  },
  activeButton: 
  {
        backgroundColor: 'hsl(28, 83%, 46%)', 

        borderWidth:1,
        borderColor:'hsl(28, 83%, 46%)',
        height:'43%',
        width:'100%',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
  },
  activeText: {
    color: 'white', 
    fontWeight:'800'
},


})
export default styles