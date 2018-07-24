/*
** APP登录思路
** 难题：
** 由于report的展示需要使用webview，但是直接在webview中打开report地址是无权限查看的。
** 解决方法：
** 1.登录的时候创建一个webview进行app内部webview端登录。（使用cas项目组给出的自动登录接口）
** 2.使用自动登录的时候，在webview中注入一段js来与app进行通信。
** 3.使用注入js来请求report所需权限的json
** 4.请求成功->登录成功；关闭loading，跳转到列表页
** 5.失败->登录失败；关闭loading，重新输入登录信息进行登录
*/
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StatusBar,
  AsyncStorage,
  TouchableHighlight,
  WebView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import Modal from 'react-native-modalbox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import { Hoshi } from 'react-native-textinput-effects';
import RightButton from './rightButton/index';
import styles from './style';
import member from '../../request/member';
import sys from '../../request/system';
import Title from '../../components/navTitle/index';
import LoadingOverlay from 'react-native-loading-overlay';
import { md5 } from '../../statics/js/md5';
var schema = require('async-validator');


class Main extends Component {

  static contextTypes = {
    store: React.PropTypes.object
  }
  //设置router->login的参数
  static navigationOptions = ({ navigation }) => {
    //组件在安卓中有bug，headerLeft、headerRight、都要设置，标题才能居中
    return {
      headerRight: <RightButton onPress={() => { navigation.state.params.modalConfig.open() }} />,
      headerLeft: <View></View>,
      headerTitle: <Title>{navigation.state.params && navigation.state.params.lang.login_title}</Title>,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      ip: '',
      port: '',
      remember: true,//记住登录
      loadingOverlayVisible: false,
    }
  }
  componentWillMount() {
    let { i18n: lang } = this.context.store.getState();
    this.setState({ lang });
    this.reFillData()
  }
  reFillData() {
    AsyncStorage.getItem('userInfo').then((data) => {
      if (data) {
        userInfo = JSON.parse(data);
        let { username, password, ip, port } = userInfo;
        this.setState({
          username,
          password,
          ip,
          port
        })
      }
    })
  }
  componentDidMount() {
    let { i18n: lang } = this.context.store.getState();
    //把模态窗赋给router
    this.props.navigation.setParams({ modalConfig: this.refs.modalConfig, lang });
  }
  handleSubmit() {
    var { username, password, ip, port } = this.state;
    //设置表单验证规则
    var descriptor = {
      username: { type: "string", required: true, message: this.state.lang.login_error_username },
      password: { type: "string", required: true, message: this.state.lang.login_error_password },
      ip: { type: "string", required: true, message: this.state.lang.login_error_ip },
      port: { type: "string", required: true, message: this.state.lang.login_error_port },
    }
    var validator = new schema(descriptor);
    //表单验证
    validator.validate({
      username,
      password,
      ip,
      port
    }, (errors, fields) => {
      //验证全部通过
      if (!errors) {
        //打开loading
        this.setState({
          loadingOverlayVisible: true,
        })
        member.login({ username, password, ip, port })
          .then((data) => {
            //请求错误
            if (data == undefined) {
              //关闭loading
              this.setState({
                loadingOverlayVisible: false,
              })
              Alert.alert(this.state.lang.login_error_setting);
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
                  let userInfo = this.state;
                  userInfo.casServer = data2.data.casServer;
                  //设置本地存储
                  this.setLocalStorage({
                    username,
                    password,
                    ip,
                    port,
                    token: data.data,
                    reportUrl: data2.data.reportUrl,
                    casServer: data2.data.casServer,
                    runnerUrl: data2.data.runnerUrl,
                  })
                  this.setState({
                    loadingOverlayVisible: false,
                  })
                  this.props.navigation.replace('Home');
                });
            }
            //用户名密码失败
            else {
              //关闭loading
              this.setState({
                loadingOverlayVisible: false,
              })
              Alert.alert(this.state.lang.login_error_login);
            }
          })
      }
      //验证失败
      else {
        Alert.alert(errors[0].message)
      }

    });
  }
  setStore(param) {
    this.context.store.dispatch({
      type: 'SET_USER_INFO',
      data: param
    })
  }
  setLocalStorage(param) {
    AsyncStorage.setItem('userInfo', JSON.stringify(param));
  }
  removeLocalStorage() {
    AsyncStorage.removeItem('userInfo');
  }
  render() {
    let { i18n: lang } = this.context.store.getState();
    return (
      <View style={styles.container}>
        <StatusBar ref='statusBar' barStyle={'light-content'} />
        <View style={styles.content}>
          <Text style={styles.title}>SDC BE</Text>
          <View style={styles.textWrap}>
            <View style={styles.textLine}></View>
            <Text style={styles.text}>welcome</Text>
          </View>
          <View style={styles.inputWrap}>
            <Hideo
              autoCapitalize='none'
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'white'}
              iconBackgroundColor={'#1A2340'}
              inputStyle={styles.inputStyle}
              style={styles.labelStyle}
              placeholder={lang.login_username}
              value={this.state.username}
              placeholderTextColor='rgba(255,255,255,0.5)'
              onChangeText={(text) => { this.setState({ username: text }) }}
            />
          </View>
          <View style={styles.inputWrap}>
            <Hideo
              autoCapitalize='none'
              iconClass={FontAwesomeIcon}
              iconName={'unlock-alt'}
              iconColor={'white'}
              iconBackgroundColor={'#1A2340'}
              inputStyle={styles.inputStyle}
              style={styles.labelStyle}
              placeholder={lang.login_password}
              value={this.state.password}
              secureTextEntry={true}
              placeholderTextColor='rgba(255,255,255,0.5)'
              onChangeText={(text) => { this.setState({ password: text }) }}
            />
          </View>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='transparent'
            onPress={() => { this.setState({ remember: !this.state.remember }) }}
            style={{ marginTop: 10 }}
          >
            <View style={styles.rememberWrap}>
              <View style={styles.rememberCheckbox}>
                {this.state.remember && <Icon style={styles.rememberCheckIcon} name='md-checkmark' />}
              </View>
              <Text style={styles.rememberText}>{lang.login_remember}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.submitWrap}>
            <Button onPress={() => { this.handleSubmit() }} style={{ backgroundColor: '#F6B610' }} textStyle={{ fontSize: 18, color: '#131D33' }}>
              {lang.login_submit}
            </Button>
          </View>
        </View>

        <Modal
          style={styles.modalConfig}
          entry={"top"}
          position={"center"}
          ref={"modalConfig"}>
          <Text style={styles.modalTitle}>{lang.login_api}</Text>
          <View style={styles.modalInputWrap}>
            <Hoshi
              autoCapitalize='none'
              label={lang.login_ip}
              borderColor={'#F6B710'}
              value={this.state.ip}
              onChangeText={(text) => { this.setState({ ip: text }) }}
            />
          </View>
          <View style={styles.modalInputWrap}>
            <Hoshi
              autoCapitalize='none'
              label={lang.login_port}
              borderColor={'#F6B710'}
              value={this.state.port}
              onChangeText={(text) => { this.setState({ port: text }) }}
            />
          </View>
          <View style={styles.modalSubmitWrap}>
            <Button onPress={() => { this.refs.modalConfig.close() }} style={{ backgroundColor: '#F6B610' }} textStyle={{ fontSize: 18, color: '#131D33' }}>
              {lang.login_api_confirm}
            </Button>
          </View>
        </Modal>
        <LoadingOverlay visible={this.state.loadingOverlayVisible} />
      </View>
    );
  }
}

export default Main

