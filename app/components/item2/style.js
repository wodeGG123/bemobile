import {StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        width:parseInt(width/2)-20,
        height:(parseInt(width/2-20)*0.8),
        borderWidth:1,
        borderColor:'#5FFFFE',
        backgroundColor:'#273A63',
        display:'flex',
        alignItems:'center',
        paddingTop:6,
        marginTop:10,
    },
    imgWrap:{
        width:parseInt(width/2)-32,
        height:(parseInt(width/2-32)*0.8),
    },
    img:{
        width:parseInt(width/2)-32,
        height:(parseInt(width/2-32)*0.8),
    },
    imgText:{
        position:'absolute',
        left:2,
        bottom:2,
        backgroundColor:'transparent',
        color:'#F6B710',
        width:parseInt(width/2)-32,
        height:24,
        lineHeight:24,
        backgroundColor:'rgba(0,0,0,0.4)',
        padding:0,
        margin:0,
    },
});