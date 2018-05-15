import {StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    wrap:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginRight:10,
        width:width-60,
        height:32,
        backgroundColor:'#0C1322',
        borderRadius:16,
    },
    icon:{
        fontSize:22,
        marginLeft:10,
        color:'#868584'
    },
    input:{
        width:'100%',
        fontSize:14,
        color:'#868584',
        marginLeft:5,
        borderWidth:0,
        backgroundColor:'transparent',
        height:32,
        lineHeight:32,
    }
});