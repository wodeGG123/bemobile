import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
  Animated,
  Dimensions,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import styles from './style'
import LeftButton from './leftButton/index';
import LoadingOverlay from 'react-native-loading-overlay';
import Title from '../../../components/navTitle/index';
import Header from '../../../components/header/index';
import BarProgress from '../../../components/barProgress/index';
import { md5 } from '../../../statics/js/md5';
import report from '../../../request/report';



// invoke API directly when in need

var { height, width } = Dimensions.get('window');
var preLoad = require('./resources/preLoad.html')
export default class Main extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   //组件在安卓中有bug，headerLeft、headerRight、都要设置，标题才能居中
  //   return {
  //     headerLeft: <LeftButton onPress={() => { navigation.pop() }} />,
  //     headerRight: <View></View>,
  //     headerTitle: <Title>{navigation.state.params.lang && navigation.state.params.lang.detail_title}</Title>,
  //   };
  // }
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      loadingOverlayVisible: false,
      fadeAnim: new Animated.Value(-width),
      uri: '',
    }
  }
  show(data) {

    // 绑定原生返回键事件
    BackAndroid.addEventListener("hardwareBackPress", this.onBackPressed())
    let userInfo = this.context.store.getState().userInfo;
    let report_uri = userInfo.reportUrl + '/' + this.props.data.flowId + '/index.html'
    let uri = `${userInfo.casServer}/autologin?username=${userInfo.username}&password=${md5(userInfo.password, userInfo.username)}&token=${userInfo.token}&credentials=${userInfo.token}&service=http%3A%2F%2F${userInfo.ip}%3A${userInfo.port}%2Fsae%2Fj_security_check&executor=${encodeURIComponent(report_uri)}`

    this.setState({
      uri
    }, () => {
      report.addReportHistory({
        glanceType: 0,
        isOwn: 1,
        reportId: this.props.data.flowId,
        loginId: userInfo.token,
        glanceScene: 1,
        ip: userInfo.ip,
        port: userInfo.port

      })
    })
    this.refs.progress.start();
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 0,        // Target
        duration: 100,    // Configuration
      },
    ).start();             // Don't forget start!

  }
  hide() {
    // 解除绑定原生返回键事件
    BackAndroid.removeEventListener('hardwareBackPress', this.a);
    this.setState({
      uri: ''
    })
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: -width,        // Target
        duration: 100,    // Configuration
      },
    ).start();             // Don't forget start!
    this.refs.progress.end();
  }

  componentWillMount() {
    let userInfo = this.context.store.getState().userInfo;
  }
  onBackPressed() {
    var that = this;
    let a = function () {
      that.hide()
      return true
    }
    this.a = a

    return a;
  }
  //组件卸载之前移除监听
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.a);
  }
  render() {
    let { i18n: lang } = this.context.store.getState();
    let userInfo = this.context.store.getState().userInfo;
    let injectJS = `
      var appJS = document.createElement('script');
      appJS.src = '${userInfo.runnerUrl}/static/js/app.js';
      var appCSS = document.createElement('link');
      appCSS.type = 'text/css';
      appCSS.rel = 'stylesheet';
      appCSS.href = '${userInfo.runnerUrl}/static/css/app.css';
      document.body.appendChild(appJS);
      document.body.appendChild(appCSS);
    `
    let uri = preLoad
    if (this.state.uri) {
      injectJS = ''
      uri = { uri: this.state.uri, headers: { 'Cache-Control': 'no-cache' } }
    }
    // let uri = this.props.navigation.state.params.reportUrl + '/' + this.props.navigation.state.params.flowId + '/index.html'
    // let uri = 'http://10.0.5.60:8388/sae/static/report/37e9ade5b8914136bb66b7a6ed03b169/index.html'
    //在详情中展示webView
    return (
      <Animated.View style={[styles.container, { left: this.state.fadeAnim }]}>
        <Header
          left={<LeftButton onPress={() => { this.hide() }} />}
          center={this.props.data.reportName || ''}
        />
        <WebView
          style={styles.webView}
          injectedJavaScript={injectJS}
          // source={{ uri: this.state.uri }}
          source={uri}
          scalesPageToFit={true}
          onLoadStart={() => { this.refs.progress.start(); }}
          onLoadEnd={() => { this.refs.progress.end(); }}
        />
        <BarProgress ref='progress' time={10000} />
        <LoadingOverlay visible={this.state.loadingOverlayVisible} />
      </Animated.View>
    );
  }
}

