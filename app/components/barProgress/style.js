import { StyleSheet, Dimensions, Platform } from 'react-native';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: '100%',
        height: 3,
        position: 'absolute',
        top: Platform.OS == 'ios' ? 64 : 40,
        left: 0,
    },
    inner: {
        height: 3,
        width: '0%',
        backgroundColor: 'green',
    }
});