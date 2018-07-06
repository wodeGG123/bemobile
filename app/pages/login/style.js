import { StyleSheet, Dimensions } from 'react-native';
import configStyle from '../../config/style';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#131D33',
        // height:height - 64,
        height: '100%',
        width: '100%',
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        width: width - 40,
        position: 'relative',
        top: -30
    },
    title: {
        fontSize: 32,
        color: '#F6B610',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputWrap: {
        height: 48,
        marginTop: 15,
    },
    labelStyle: {
    },
    inputStyle: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: 'rgba(255,255,255,0.7)',
    },
    textWrap: {
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        color: '#429DC9',
        backgroundColor: '#131D33',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        width: 100,
        textAlign: 'center'
    },
    textLine: {
        display: 'flex',
        height: 1,
        backgroundColor: '#429DC9',
        width: '100%',
        position: 'relative',
        top: 15,
    },
    submitWrap: {
        marginTop: 60,
    },
    rememberWrap: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberCheckbox: {
        width: 16,
        height: 16,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#204686',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberCheckIcon: {
        color: '#204686',
        fontWeight: 'bold',
    },
    rememberText: {
        fontSize: 16,
        marginLeft: 3,
        color: '#525773'
    },
    modalConfig: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 340,
        backgroundColor: "#1B253C",
    },
    modalInputWrap: {
        width: width - 40,
        marginTop: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#F6B710',
    },
    modalSubmitWrap: {
        marginTop: 50,
        width: width - 40,
    },
    webWrap: {
        display: 'none'
    }
});