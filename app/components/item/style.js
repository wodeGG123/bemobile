import { StyleSheet, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        width: parseInt(width / 2) - 20,
        height: (parseInt(width / 2 - 20) * 0.8),
        borderWidth: 1,
        borderColor: '#5FFFFE',
        backgroundColor: '#273A63',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 6,
        marginTop: 10,
    },
    imgWrap: {
        width: parseInt(width / 2) - 34,
        height: (parseInt(width / 2 - 32) * 0.6),
    },
    img: {
        width: parseInt(width / 2) - 34,
        height: (parseInt(width / 2 - 32) * 0.6),
    },
    imgText: {
        position: 'absolute',
        left: 2,
        bottom: 2,
        backgroundColor: 'transparent',
        color: '#F6B710',
    },
    text: {
        width: parseInt(width / 2) - 20,
        backgroundColor: 'transparent',
        marginTop: 6,
        paddingLeft: 6,
        color: '#5FFFFE',
    }
});