import { StyleSheet, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width,
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0
    },
    webView: {
        backgroundColor: '#ffffff',
        width,
    }
});