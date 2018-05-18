import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StatusBar,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button';
import Modal from 'react-native-modalbox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import { Hoshi } from 'react-native-textinput-effects';
import RightButton from './rightButton/index';
import styles from './style';
import member from '../../request/member'

var schema = require('async-validator');


class Main extends Component {
  //设置router->login的参数
  static navigationOptions = ({ navigation }) => {
    //组件在安卓中有bug，headerLeft、headerRight、都要设置，标题才能居中
    return {
      headerRight: <RightButton onPress={()=>{navigation.state.params.modalConfig.open()}} />,
      headerLeft: <View></View>
    };
    
  }
  static contextTypes = {
    store:React.PropTypes.object
  }
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      ip:'',
      port:'',
      remember:true,//记住登录
    }
  }
  componentDidMount() {
    //把模态窗赋给router，这样在
    this.props.navigation.setParams({ modalConfig: this.refs.modalConfig });
    //判断是否登录过且记住登录
    this.isLogined();
  }
  handleSubmit(){
    var {username,password,ip,port} = this.state;
    //设置表单验证规则
    var descriptor = {
      username: {type: "string", required: true},
      password: {type: "string", required: true},
      ip: {type: "string", required: true},
      port: {type: "string", required: true},
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
      if(!errors) {
        member.login({
          username,
          password,
          ip,
          port
        })
        .then((data)=>{
          //请求错误
          if(data == undefined){
            Alert.alert('配置错误！')
            return false;
          }
          //用户名密码正确
          if(data.statusCode == '200'){
            //设置store的userInfo
            this.setStore({
              username,
              password,
              ip,
              port,
              token:data.data
            });
            //设置本地存储
            if(this.state.remember){
              this.setLocalStorage({
                username,
                password,
                ip,
                port,
                token:data.data
              })
            }else{
              this.removeLocalStorage();
            }
            
            this.props.navigation.push('Home');
          }
          //用户名密码失败
          else{
            Alert.alert('用户名或密码错误！');
          }
        })
      }
      //验证失败
      else{
        Alert.alert(errors[0].message)
      }
      
    });
  }
  setStore(param){
    this.context.store.dispatch({
      type:'SET_USER_INFO',
      data:param
    })
  }
  setLocalStorage(param){
    AsyncStorage.setItem('userInfo',JSON.stringify(param));
  }
  removeLocalStorage(){
    AsyncStorage.removeItem('userInfo');
  }
  isLogined(){
    let userInfo = false;
    AsyncStorage.getItem('userInfo')
    .then((data)=>{
      if(data){
        userInfo = JSON.parse(data);
        let {username,password,ip,port} = userInfo;
        member.login({
          username,
          password,
          ip,
          port
        })
        .then((data)=>{
          //请求错误
          if(data == undefined){
            Alert.alert('配置错误！')
            return false;
          }
          //用户名密码正确
          if(data.statusCode == '200'){
            //设置store的userInfo
            this.setStore({
              username,
              password,
              ip,
              port,
              token:data.data
            });
            //设置本地存储
            this.setLocalStorage({
              username,
              password,
              ip,
              port,
              token:data.data
            })
           
            this.props.navigation.push('Home');
          }
          //用户名密码失败
          else{
            Alert.alert('用户名或密码错误！');
          }
        })

      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
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
                placeholder='账号'
                placeholderTextColor='rgba(255,255,255,0.5)'
                onChangeText={(text) => { this.setState({username: text}) }}
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
                placeholder='密码'
                placeholderTextColor='rgba(255,255,255,0.5)'
                onChangeText={(text) => { this.setState({password: text}) }}
              />
            </View>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor='transparent'
              onPress={()=>{this.setState({remember:!this.state.remember})}}
              style={{marginTop:10}}
            >
              <View style={styles.rememberWrap}>
                <View style={styles.rememberCheckbox}>
                  {this.state.remember&&<Icon style={styles.rememberCheckIcon} name='md-checkmark' />}
                </View>
                <Text style={styles.rememberText}>记住密码</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.submitWrap}>
              <Button onPress={()=>{this.handleSubmit()}} style={{backgroundColor: '#F6B610'}} textStyle={{fontSize: 18,color:'#131D33'}}>
                登录
              </Button>
            </View>
        </View>

        <Modal 
          style={styles.modalConfig}
          entry={"top"}
          position={"center"} 
          ref={"modalConfig"}>
            <Text style={styles.modalTitle}>接口设置</Text>
            <View style={styles.modalInputWrap}>
              <Hoshi
                autoCapitalize='none'
                label={'IP地址'}
                borderColor={'#F6B710'}
                onChangeText={(text) => { this.setState({ip: text}) }}
              />
            </View>
            <View style={styles.modalInputWrap}>
              <Hoshi
                autoCapitalize='none'
                label={'端口号'}
                borderColor={'#F6B710'}
                onChangeText={(text) => { this.setState({port: text}) }}
              />
            </View>
            <View style={styles.modalSubmitWrap}>
              <Button onPress={()=>{this.refs.modalConfig.close()}} style={{backgroundColor: '#F6B610'}} textStyle={{fontSize: 18,color:'#131D33'}}>
                确认
              </Button>
            </View>
        </Modal>
      </View>
    );
  }
}

export default Main

