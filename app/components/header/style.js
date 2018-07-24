import { StyleSheet, Dimensions, Platform } from 'react-native';
import configStyle from '../../config/style';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: configStyle.sH,
        height: Platform.OS == 'ios' ? 64 : 40,
        paddingTop: Platform.OS == 'ios' ? 24 : 0,
        backgroundColor: '#162440',
        width: '100%',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2
    },
    left: {
        height: 40,
        width: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 60
    },
    centerText: {
        textAlign: 'center',
        color: '#F6B610',
        fontSize: 18,
    },
    right: {
        flex: 1,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});