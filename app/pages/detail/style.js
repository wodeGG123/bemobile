import {StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        width,
        height:'100%',
    },
    webView:{
        backgroundColor: '#ffffff',
        width,
    }
});