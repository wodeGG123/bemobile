//基本组件
import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from './style';
import Title from "./title";

//页面
import LoginScreen from '../pages/login/index'; 
import HomeScreen from '../pages/home/index'; 
import DetailScreen from '../pages/detail/index'; 

//RN-router 默认加载第一个
export default createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions:{
            headerTitle:<Title>登录</Title>,
            headerStyle:styles.header,
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            header:null,
        }
    },
    Detail: {
        screen: DetailScreen,
        navigationOptions:{
            123
            headerTitle:<Title>详情</Title>,
            headerStyle: styles.header,
        }
    }
});