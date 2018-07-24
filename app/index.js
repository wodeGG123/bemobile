import React, { Component } from 'react';
import { Platform, AsyncStorage, View, Text } from 'react-native';
import RouterMaster from './routers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import Orientation from 'react-native-orientation';//屏幕旋转插件
import config from './config/index';
import i18n from './statics/i18n/index';
import member from './request/member';
import sys from './request/system';
var store = createStore(reducers);//创建store
let lang = i18n(config.LANGUAGE)
//app wrap , you can init app in this component
class AppWrap extends Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {

    if (Platform.OS == 'ios') {
      Orientation.getSpecificOrientation((err, orientation) => {
        switch (orientation) {
          case 'PORTRAIT':
            Orientation.lockToPortrait();
            break;
          case 'LANDSCAPE-RIGHT':
            Orientation.lockToLandscapeRight();
            break;
          case 'LANDSCAPE-LEFT':
            Orientation.lockToLandscapeLeft();
            break;
          case 'PORTRAITUPSIDEDOWN':
            // Orientation.lockToLandscape();
            break;
          default:
            break;
        }
      });//锁定屏幕
    } else if (Platform.OS == 'android') {
      Orientation.getOrientation((err, orientation) => {
        switch (orientation) {
          case 'PORTRAIT':
            Orientation.lockToPortrait();
            break;
          case 'LANDSCAPE':
            Orientation.lockToLandscape();
            break;
          default:
            break;
        }
      });//锁定竖屏
    }

    //设置国际化，默认是中文，配置文件在config内
    store.dispatch({
      type: 'SET_LANGUAGE',
      data: i18n(config.LANGUAGE)
    })
  }
  render() {
    return (this.props.children)
  }
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      init: false
    }
  }
  componentWillMount() {
    this.isLogined()
  };
  isLogined() {
    let userInfo = false;
    AsyncStorage.getItem('userInfo')
      .then((data) => {
        if (data) {
          userInfo = JSON.parse(data);
          let { username, password, ip, port } = userInfo;
          member.login({
            username,
            password,
            ip,
            port
          })
            .then((data) => {
              //请求错误
              if (data == undefined) {
                Alert.alert(this.state.lang.login_error_setting);
                this.setState({
                  init: true
                })
                return false;
              }
              //用户名密码正确
              if (data.statusCode == '200') {
                //获取系统信息
                sys.getInfo({
                  loginId: data.data,
                  ip: ip,
                  port: port
                })
                  .then((data2) => {
                    //设置store的userInfo
                    this.setStore({
                      username,
                      password,
                      ip,
                      port,
                      token: data.data,
                      reportUrl: data2.data.reportUrl,
                      casServer: data2.data.casServer,
                      runnerUrl: data2.data.runnerUrl,
                    });
                    //设置自动登录（webview组件需要）
                    userInfo.casServer = data2.data.casServer;
                    this.setState({
                      username,
                      password,
                      ip,
                      port,
                      token: data.data,
                      reportUrl: data2.data.reportUrl,
                      casServer: data2.data.casServer,
                      runnerUrl: data2.data.runnerUrl,
                    })

                    //设置本地存储
                    this.setLocalStorage({
                      username,
                      password,
                      ip,
                      port,
                      token: data.data,
                      reportUrl: data2.data.reportUrl,
                      casServer: data2.data.casServer,
                    })
                    global.indexPage = 'Home'
                    this.setState({
                      init: true
                    })
                  });
              }
              //用户名密码失败
              else {
                this.setState({
                  init: true
                })
                Alert.alert(this.state.lang.login_error_login);
              }
            })

        } else {
          this.setState({
            init: true
          })
        }
      });
  }
  setLocalStorage(param) {
    AsyncStorage.setItem('userInfo', JSON.stringify(param));
  }
  setStore(param) {
    store.dispatch({
      type: 'SET_USER_INFO',
      data: param
    })
  }
  render() {
    let Router = null
    if (this.state.init) {
      Router = RouterMaster()
    }
    //app入口并且设置全局store
    return (<Provider store={store}><AppWrap>{this.state.init ? <Router /> :
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#131D33' }}><Text style={{ color: '#F6B710', fontSize: 16 }}>{lang.welcome}</Text></View>
    }</AppWrap></Provider>);
  }
}
