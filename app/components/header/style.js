import {StyleSheet, Dimensions, Platform} from 'react-native';
import configStyle from '../../config/style';
var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingTop:configStyle.sH,
        height:Platform.OS=='ios'?64:40,
        paddingTop:Platform.OS=='ios'?24:0,
        backgroundColor:'#162440',
        width,
        borderBottomWidth:0,
        shadowColor:'#000000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:2
    },
    left:{
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    center:{
        textAlign:'center',
        height:40,
        color:'#F6B610',
        fontSize:18,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    right:{
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
});