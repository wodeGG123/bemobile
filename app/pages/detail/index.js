import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
} from 'react-native';
import styles from './style'
import LeftButton from './leftButton/index';

export default class Main extends Component {
  //设置router->login的参数
  static navigationOptions = ({ navigation }) => {
    //组件在安卓中有bug，headerLeft、headerRight、都要设置，标题才能居中
    return {
      headerLeft: <LeftButton onPress={()=>{navigation.pop()}} />,
      headerRight: <View></View>,
    };
  }

  render() {
    //在详情中展示webView
    return (
      <View style={styles.container}>
          <WebView
            style={styles.webView}
            source={{uri: 'http://10.0.5.58:8488/sefon-cas/autologin?username=admin&password=319a5d2ce2e52aaec8c09008ee85517f&token=a&credentials=b&service=http://10.0.5.58:8080/sae'}}
            scalesPageToFit={true}
          />
      </View>
    );
  }
}

